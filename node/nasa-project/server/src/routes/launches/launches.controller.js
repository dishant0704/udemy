// const {launchesService} = require('../../models/launches.model');
const {  
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

const{getPagination} = require("../../mongoConfig/Query")

async function httpGetAllLaunches(req, res) {
  
  try {
    const {limit, skip} = getPagination(req.query)
    const launches = await getAllLaunches(limit, skip);    
    return res.status(200).json(launches);
  } catch (error) {
    console.error("GET /launches failed:", error);

    return res.status(500).json({
      error: "Failed to get launches",
    });
  }
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ error: "Missing required launch property" });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Invalid launch date" });
  }
  await addNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  try {
    const launchId = Number(req.params.id);

    if (!Number.isInteger(launchId)) {
      return res.status(400).json({
        error: "Invalid launch ID",
      });
    }

    const existingLaunch = await existLaunchWithId(launchId);

    if (!existingLaunch) {
      return res.status(404).json({
        error: "Launch not found",
      });
    }

    const aborted = await abortLaunchById(launchId);

    if (!aborted) {
      return res.status(400).json({
        error: "Launch not aborted",
      });
    }

    return res.status(200).json({
      ok: true,
      launch: aborted,
    });
  } catch (error) {
    console.error("DELETE /launches failed:", error);

    return res.status(500).json({
      error: "Failed to abort launch",
    });
  }
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
