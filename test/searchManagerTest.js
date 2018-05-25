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
  });
