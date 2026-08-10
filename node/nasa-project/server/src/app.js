const path = require('path');
const express = require('express');
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
app.use('/planets', planetsRoute);
app.use('/launches', launchesRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

module.exports = app;
