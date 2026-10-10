const path = require('path');
const express = require('express');
const api = require('./routes/api');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

const planetsRoute = require('./routes/planetsRoute/planets.route');
const launchesRoute = require('./routes/launches/launches.route');

//middleware
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

//route middleware
app.use('/v1', api);

// API 404
app.use("/v1", (req, res) => {
  res.status(404).json({
    error: "API route not found",
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;