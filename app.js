const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
const log = require("./src/logger.js").log;
const handlers= require("./src/handlers.js");

app.fs = fs;

app.use(log());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: false
}));
app.post("/token",handlers.tokenHandler);
app.use(express.static('public'));
app.use(handlers.respondWith404);

module.exports=app;