const express = require('express');
const planetsRoute = require('./planetsRoute/planets.route');
const launchesRoute = require('./launches/launches.route');

const api = express.Router();

//route middleware
api.use('/planets', planetsRoute);
api.use('/launches', launchesRoute);

module.exports = api;