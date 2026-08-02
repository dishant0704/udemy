
const express = require('express');
const cors = require('cors');
const app = express();

const planetsRoute = require('./routes/planetsRoute/planets.route');

//middleware
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());

//route middleware
app.use('/planets', planetsRoute);

module.exports = app;
