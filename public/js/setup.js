
const getButton =function(element,callBack){
    let button = document.createElement('button');
    button.innerText = element.name;
    button.onclick = callBack;
    return button;
}
const getTableData = function(data){
    let td = document.createElement('td');
    td.innerText = data;
    return td;
}
const getSearchButton = function(){
    return '<button onclick="startSearch()">SEARCH</button>'
};

const getTableRowWithData=function(firstData,secondData,ThirdData){
   let tableRow = document.createElement("tr");
   tableRow.appendChild(getTableData(firstData));
   tableRow.appendChild(getTableData(secondData));
   tableRow.appendChild(getTableData(ThirdData));
   return tableRow; 
}

const storePlanets =function () {
    let planets=JSON.stringify(this.responseText);
    createRequest(showError,"/planets",`planets=${planets}`,"POST");
};

const storeVehicles =function () {
    let vehicles=JSON.stringify(this.responseText);
    createRequest(showError,"/vehicles",`vehicles=${vehicles}`,"POST");
};

const storeToken=function(){
    let data=JSON.parse(this.responseText).token;
    createRequest(showError,"/token",`token=${data}`,"POST");
    window.location.href ="/setup.html";    
};

const getPlanetAndVehicles = function (){
    createRequestFor("planets",storePlanets);
    createRequest(showOptionsForPlanets,"/availablePlanets");
    createRequestFor("vehicles",storeVehicles);
};

const showOptionsForPlanets=function(){
    let options = JSON.parse(this.responseText);
    let optionArea = document.getElementById('options')
    optionArea.innerHTML = "<h3>SELECT PLANET TO FIND<h3>"
    options.forEach(element=>{
        optionArea.appendChild(getButton(element,updateOptionArea));
    })
}
const updatePlanetAndVehicles = function(planetName,vehicleName){
    let table = document.getElementById("selectedItems")
    table.innerHTML="<tr><th>Planets</th><th>Speed</th><th>TimeToken</th></tr>"
    createRequest(function(){
        let timeToken = JSON.parse(this.responseText);
        table.appendChild(getTableRowWithData(planetName,vehicleName,timeToken))
    },"/timeTokenFor",`planet=${planetName}&vehicle=${vehicleName}`,'POST');
    let rowCount = document.getElementsByTagName("tr").length;
    if ( rowCount == 5) {
        document.getElementById('options').innerHTML = getSearchButton();
    }
};

const showOptionsForVehicle =function () {
    let vehicles = JSON.parse(this.responseText);
    let optionArea = document.getElementById('options')        
    vehicles.forEach(element=>{
        optionArea.appendChild(getButton(element,function(){
            let planet = document.getElementsByTagName("h3")[0].id;
            let vehicle = this.innerText;
            createRequest(showError,'/addToFind',`planet=${planet}&vehicle=${vehicle}`,'POST');
            updatePlanetAndVehicles(planet,vehicle);
            showOptionsForPlanets();
        }));
    });
};

 let updateOptionArea = function (){
    let planet = this.innerText;
    let optionArea = document.getElementById('options')
    optionArea.innerHTML = `<h3 id="${planet}"> SELECT VEHICLE TO FIND ON - ${planet}<h3>`
    createRequest(showOptionsForVehicle,'/availableVehicles');
 }

 let startSearch= function(){
    createRequest(displayResult,"/");    
 };