const assert = require("chai").assert;
let SearchManager = require("../src/searchManager");

let searchManager = {};

describe("SearchManager", () => {
    let vehicles = '[{"name":"Space pod","total_no":2,"max_distance":200,"speed":2},{"name":"Space ship","total_no":2,"max_distance":600,"speed":10}]';
    let planets = '[{"name":"Donlon","distance":100},{"name":"Enchai","distance":200}]';
    beforeEach(
        () => {
            searchManager = new SearchManager();
        }
    );

    describe("token", () => {
        beforeEach(
            () =>{
                searchManager.addToken("abc123")
            }
        );
        it("searchManager.addToken() should add token", () => {
            assert.equal(searchManager.token,"abc123");
          });
        it("searchManager.getToken() should return token", () => {
        assert.equal(searchManager.getToken(), "abc123");
      });
    });

    describe("addPlanets", () => {
      it("should add planets to searchManager", () => {
          searchManager.addPlanets(planets);
          assert.deepEqual(searchManager.planets,JSON.parse(planets));
      });
    });

    describe("addVehicle", () => {
      it("should add vehicles to searchManager", () => {
          searchManager.addVehicles(vehicles);
          assert.deepEqual(searchManager.vehicles,JSON.parse(vehicles));
      });
    });

    describe('updatePlanetsAndVehicles', () => {
        beforeEach(() => {
            searchManager.addVehicles(vehicles);
            searchManager.addPlanets(planets);
        });
        it('should update vehicles and planet data', () => {
            searchManager.updatePlanetsAndVehicles("Donlon","Space pod");
            let expectedPlanets = [{"name":"Enchai","distance":200}];
            let expectedVehicles = [{"name":"Space pod","total_no":1,"max_distance":200,"speed":2},{"name":"Space ship","total_no":2,"max_distance":600,"speed":10}]
            assert.sameDeepMembers(searchManager.planets, expectedPlanets);
            assert.sameDeepMembers(searchManager.vehicles, expectedVehicles);
        });
    });
    
    describe('searchManager.addToFind()', () => {
        beforeEach(() => {
            searchManager.addVehicles(vehicles);
            searchManager.addPlanets(planets);
        });
        it('should add planets name and vehicles name in find list', ()=>{
            searchManager.addToFind("Donlon","Space pod");
            assert.deepEqual(searchManager.planetsToFind,["Donlon"]);
            assert.deepEqual(searchManager.vehiclesToFind,["Space pod"]);
        });
        it('should update vehicles and planet data too', () => {
            searchManager.updatePlanetsAndVehicles("Donlon","Space pod");
            let expectedPlanets = [{"name":"Enchai","distance":200}];
            let expectedVehicles = [{"name":"Space pod","total_no":1,"max_distance":200,"speed":2},{"name":"Space ship","total_no":2,"max_distance":600,"speed":10}]
            assert.sameDeepMembers(searchManager.planets, expectedPlanets);
            assert.sameDeepMembers(searchManager.vehicles, expectedVehicles);
        });
    });
    describe('searchManager.getToFind', () => {
        beforeEach(() => {
            searchManager.addVehicles(vehicles);
            searchManager.addPlanets(planets);
        });
        it('should get name from find list', ()=>{
            searchManager.addToFind("Donlon","Space pod");
            assert.deepEqual(searchManager.getToFind("planets"),["Donlon"]);
            assert.deepEqual(searchManager.getToFind("vehicles"),["Space pod"]);
        });
    });
    
    describe('searchManager.getAvailable', () => {
        beforeEach(() => {
            searchManager.addVehicles(vehicles);
            searchManager.addPlanets(planets);
        });
        it('should return all available planets to search', () => {
            searchManager.addToFind("Donlon","Space pod");
            let expectedPlanets = [{"name":"Enchai","distance":200}];
            assert.deepEqual(searchManager.getAvailable("planets"),expectedPlanets);
        });
        it('should return all available vehicles to search', () => {
            searchManager.addToFind("Donlon","Space pod");
            searchManager.addToFind("Enchai","Space pod");
            let expectedVehicles = [{"name":"Space ship","total_no":2,"max_distance":600,"speed":10}];
            assert.deepEqual(searchManager.getAvailable("vehicles"),expectedVehicles);
        });
    });
    // describe('Game status', () => {
    //   beforeEach(() => {
    //     searchManager.loadPieces();
    //     searchManager.addPlayer("ravi", 0, 'red');
    //     searchManager.addPlayer("ankur", 1, 'blue');
    //     let redArmyPos = {'3_2': 'F', '3_1': 'B', '9_0': '10'};
    //     let blueArmyPos = {'3_5': '2', '4_1': 'B', '3_3': 'F'};
    //     searchManager.setBattlefieldFor(0, redArmyPos);
    //     searchManager.setBattlefieldFor(1, blueArmyPos);
    //   });
    //   describe('# updateGameStatus', () => {
    //     beforeEach(() => {
    //       let player = searchManager.players.getPlayer(0);
    //       player.kill('F');
    //       searchManager.updateGameStatus();
    //     });
    //     it('should update game status as over if any of player has lost', () => {
    //       assert.isOk(searchManager.gameOver);
    //     });
    //     it('should update name of winner in game when game is over', () => {
    //       assert.equal(searchManager.winner, 1);
    //     });
    //   });
    //   describe('draw game',()=>{
    //     it('should update game draw if no moving piece left on battlefield',()=>{
    //       let piecesId = ['s',2,2,3,3,9,10];
    //       let player1 = searchManager.players.getPlayer(0);
    //       let player2 = searchManager.players.getPlayer(1);
    //       piecesId.forEach(pieceId=>{
    //         player1.kill(pieceId);
    //       });
    //       piecesId.forEach(pieceId=>{
    //         player2.kill(pieceId);
    //       });
    //       searchManager.updateGameStatus();
    //       assert.isOk(searchManager.gameOver);
    //       assert.equal(searchManager.winner, '');
    //     });
    //   });
    // });
  });
//   it("should return empty array when no planets added", () => {
//     assert.deepEqual(searchManager.players, {players: []});
//   });