const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

const planetsRoute = require('./routes/planetsRoute/planets.route');

//middleware
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

//route middleware
app.use('/planets', planetsRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

module.exports = app;
