const respondWith404 = function(req, res) {
    res.status(404).send(`404 File not found!\t bad url ${req.url}`);
};

const tokenHandler=function(req,res){
    let token=req.body.token
    res.cookie("token",token);
    res.send("true");
}

module.exports={
    respondWith404,
    tokenHandler
}