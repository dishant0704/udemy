
const { getPlanets } = require('../../models/planets.model');

function httpGetAllPlanets(req, res) {
  return res.status(200).json(getPlanets);
}

module.exports = {
  httpGetAllPlanets,
};