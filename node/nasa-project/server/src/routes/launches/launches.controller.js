const launchesService = require('../../models/launches.model');
const { getAllLaunches } = launchesService;

async function httpGetAllLaunches(req, res){
  return res.status(200).json(Array.from(getAllLaunches.values()));
}

module.exports = { httpGetAllLaunches};