let isIndex = type => type == "index";

let fetch = function(array, objName, type="obj") {
  if (isIndex(type)){
    return array.findIndex(obj => obj.name == objName);
  }
  console.log(array,objName,type);
  
  return array.find(obj => obj.name == objName);
};

class SearchManager {
    constructor() {
        this.token="";
        this.allPlanets=[];
        this.planets = [];
        this.vehicles = [];
        this.planetsToFind=[];
        this.vehiclesToFind =[];
    }

    addToken(token){
      this.token=token;
    }

    getToken(){
      return this.token;
    }

    addPlanets(planets){
      this.planets=JSON.parse(planets);
      this.allPlanets=JSON.parse(planets);
    }

    addVehicles(vehicles){
      this.vehicles=JSON.parse(vehicles);
    }

    updatePlanetsAndVehicles(planetName,vehicleName){
      let planetIndex = fetch(this.planets,planetName,"index");
      this.planets.splice(planetIndex,1);
      this.vehicles.forEach(vehicle => {
        if(vehicle.name==vehicleName){
          vehicle.total_no--;
        }
      });
    }

    getTimeToken(planetName,vehicleName){
      let planet = fetch(this.allPlanets,planetName);
      let vehicle = fetch(this.vehicles,vehicleName);
      let timeToken = planet.distance/vehicle.speed;
      return timeToken;
    }

    addToFind(planetName,vehicleName){
      this.planetsToFind.push(planetName);
      this.vehiclesToFind.push(vehicleName);
      this.updatePlanetsAndVehicles(planetName,vehicleName);
    }

    getToFind(type){
      if (type=="planets"){
        return this.planetsToFind;
      }
      return this.vehiclesToFind;
    }

    getAvailable(type){
      if (type=="planets"){
        return this.planets;
      }
      return this.vehicles.filter(vehicle=>vehicle.total_no>0);
    }

    getQuaryData(){
      let quaryData = {};
      quaryData.token = this.token;
      quaryData.planet_names = this.planetsToFind;
      quaryData.vehicle_names = this.vehiclesToFind;
      return quaryData;
    }
    
  }
  
  module.exports = SearchManager;