const axios = require("axios")

const LaunchesDataBase = require("./launches.mongo");
const NasaPlanet = require("./planets.mongo");


let DEFAULT_LAUNCH_NUMBER = 100

const launch = {
  flightNumber: 100, //DEFAULT_LAUNCH_NUMBER++;
  mission: "Kepler Exploration X", //mission_name
  rocket: "Explorer IS1", //rocket_name
  launchDate: new Date("December 27, 2030"), //net
  target: "Kepler-1652 b", //mission_type
  customers: ["NASA", "ZTM"], //mission_name
  upcoming: true, //flase
  success: true, //let str = "Launch Succcessful" let status = str.toLowerCase().includes("successful")
};

async function saveLaunches(launch) {
  try {    
    
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

async function getAllLaunches(limit, skip) {
  const launches = await LaunchesDataBase
  .find(
    {},
    {
      _id: 0,
      __v: 0,
    },
  )
  .skip(skip)
  .limit(limit)
  .lean();
  return launches;
}

async function addNewLaunch(launch) {
  const planet = await NasaPlanet.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error(`No matching planet found for target: ${launch.target}`);
  }
  const latestLaunch = await getLatestFlightNumber();

  const flightNumber = latestLaunch
    ? latestLaunch.flightNumber + 1
    : DEFAULT_LAUNCH_NUMBER;

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

const SPACEX_API_URL = "https://gateway.pipeworx.io/launches/mcp";

async function populateLaunches (){
  console.log("Loading Launches Data...");
  const responce = await axios.post(SPACEX_API_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "get_past_launches",
      arguments: {
        since: "2006-01-01",
        until: "2026-09-09",
        limit: 100,
      },
    },
  });

  // console.log("responce.data: ", responce.data.result.structuredContent.launches)
  
  if(responce.status !== 200){
    console.log("Problem downloading launch data");
    throw new Error("Launch data download dailed");
  }
  const launchDocs = responce.data.result.structuredContent.launches;  

  for (const launchDoc of launchDocs) {
    let success = launchDoc["status"].toLowerCase().includes("successful")
    let launch = {
      flightNumber: DEFAULT_LAUNCH_NUMBER++,
      mission: launchDoc["mission_name"],
      rocket: launchDoc["rocket_name"],
      launchDate: new Date(launchDoc["net"]),
      target: launchDoc["mission_type"],
      customers: [launchDoc["mission_name"]],
      upcoming: false, //flase
      success: success, //
    };
    
    await saveLaunches(launch)
  }

  // return responce;

}

async function loadLaunchesData() {
  const filghtData = await findLaunch({
    flightNumber:100,
    rocket:"Falcon 9 Block 5",
    mission: "Starlink Group 15-24"
  })
  if(filghtData){
    console.log("Filght Data Store");
  }else{
    await populateLaunches()
  }  
}

async function findLaunch(filter){
   return await LaunchesDataBase.findOne({
    filter
   })
}

async function existLaunchWithId(id) {
 return await findLaunch({
    flightNumber: id,
  });
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
  loadLaunchesData,
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
};
