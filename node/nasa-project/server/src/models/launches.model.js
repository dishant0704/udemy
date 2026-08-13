
const Launches = new Map();
let letestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'ZTM'],
    upcoming: true,
    success: true,
}

Launches.set(launch.flightNumber, launch);

function existlaunchWithId(launchId) {
    return Launches.has(launchId);
}

function addNewLaunch(launch) {
    letestFlightNumber++;
    Launches.set(letestFlightNumber, Object.assign(launch,{
        flightNumber: letestFlightNumber,
        costumers: ['ZTM', 'NASA'],
        upcoming: true,
        success: true,
    }));
}

function abortLaunchById(id) {
    console.log("Aborting launch with ID:", id);
    const aborted = Launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}
    
module.exports = {
    existlaunchWithId,
    Launches,
    addNewLaunch,
    abortLaunchById
}