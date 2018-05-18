const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
const log = require("./src/logger.js").log;
const SearchManager = require("./src/searchManager.js");
const handlers= require("./src/handlers.js");

app.searchManager = new SearchManager();

app.use(log());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: false
}));
app.post("/token",handlers.addToken);
app.post("/planets",handlers.addPlanets);
app.post("/vehicles",handlers.addVehicles);
app.post("/addToFind",handlers.addToFind);
app.post("/timeTokenFor",handlers.respondWithTimeToken);
app.get("/availablePlanets",handlers.respondWithPlanets);
app.get("/availableVehicles",handlers.respondWithVehicles);
app.use(express.static('public'));
app.use(handlers.respondWith404);

module.exports=app;