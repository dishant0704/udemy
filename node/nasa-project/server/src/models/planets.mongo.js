const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model(
  "NasaPlanet",
  planetsSchema,
  "nasa_planet"
);