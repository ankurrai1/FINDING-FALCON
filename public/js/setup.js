const getSelection =function(options){
    let select = document.createElement('select')
    options.forEach(element => {
        let option = document.createElement('option')
        option.value=element.name;
        option.id=element.distance || element.speed;
        option.innerText=element.name;
        select.appendChild(option);
    });
    return select
}
const showOptions=function(){
    let options = JSON.parse(this.responseText);
    document.getElementById('first').appendChild(getSelection(options));
    document.getElementById('second').appendChild(getSelection(options));
    document.getElementById('third').appendChild(getSelection(options));
    document.getElementById('fourth').appendChild(getSelection(options));
}

const getPlanets = function(){
    createRequest(showOptions,"https://findfalcone.herokuapp.com/planets");
}

const getVehicals = function(){
    createRequest(showOptions,"https://findfalcone.herokuapp.com/vehicles");
}

 let getPlanetAndVehical = function (){
    getPlanets();
    getVehicals();
 }