const LaunchesDataBase = require("./launches.mongo");
const NasaPlanet = require("./planets.mongo");

const DEFAULT_LAUNCH_NUMBER = 100

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-1652 b",
  customers: ["NASA", "ZTM"],
  upcoming: true,
  success: true,
};

async function saveLaunches(launch) {
  try {

    const planet = await NasaPlanet.findOne({
      keplerName: launch.target,
    });

    if (!planet) {
      throw new Error(`No matching planet found for target: ${launch.target}`);
    };
    
    const result = await LaunchesDataBase.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      {
        $set: launch,
      },
      {
        upsert: true,
      },
    );

    console.log("Launch save result:", result);
  } catch (error) {
    console.error("Could not save launch:", error);
    throw error;
  }
}

async function getLatestFlightNumber(){
  const LatestLunch = await LaunchesDataBase
  .findOne()
  .sort("-flightNumber")
  .lean();

  if(!LatestLunch){
    return DEFAULT_LAUNCH_NUMBER;
  }

  return LatestLunch
}

async function getAllLaunches() {
  const launches = await LaunchesDataBase.find(
    {},
    {
      _id: 0,
      __v: 0,
    },
  ).lean();

  console.log("Launches found:", launches.length);

  return launches;
}

async function addNewLaunch(launch) {
  const latestLaunch = await getLatestFlightNumber();

  const flightNumber = latestLaunch ? latestLaunch.flightNumber + 1 : DEFAULT_LAUNCH_NUMBER;

  const newLaunch = {
    ...launch,
    flightNumber,
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
  };

  await saveLaunches(newLaunch);

  return newLaunch;
}

async function existLaunchWithId(id) {
  const launch = await LaunchesDataBase.findOne({
    flightNumber: id,
  });

  return launch;
}

async function abortLaunchById(id) {
  return await LaunchesDataBase.findOneAndUpdate(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    },
    {
      new: true,
    },
  );
  // return aborted.modifiedCount === 1;
}

module.exports = {
  launch,
  saveLaunches,
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
};
