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
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(reqBody);
};

const storeToken=function(){
    let data=JSON.parse(this.responseText).token;
    createRequest(showError,"/token",`token=${data}`,"POST");
}

const getToken = function(){
    createRequest(storeToken,"https://findfalcone.herokuapp.com/token",null,"POST");
}

const startSetup = function(){
   getToken();
   window.location.href ="/setup.html";
}