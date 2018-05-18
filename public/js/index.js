const showError = function(){
    if(this.status != 200){
        let message = `${this.responseText} something went wrong with setup`;
        console.log(message);
        return;
    }
};

const createRequest = function(callback, url, reqBody=null, method = "GET") {
    let xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.open(method, url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(reqBody);
};

const createRequestFor=function(objectName,callback){
    let baseUrl ="https://findfalcone.herokuapp.com/"
    let urlRequestedFor = baseUrl + objectName;
    createRequest(callback,urlRequestedFor);
};

const getToken = function(){
    createRequest(storeToken,"https://findfalcone.herokuapp.com/token",null,"POST");
}

const startSetup = function(){
    getPlanetAndVehicles();
    getToken();
}