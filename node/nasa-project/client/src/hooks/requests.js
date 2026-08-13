const API_URL = "http://localhost:5000";

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
  console.log("Planets data fetched successfully.");
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  
  try{
    const response = await fetch(`${API_URL}/launches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    });

    let data = await response.json();
    
    return {
      ok: true,
      data: data
    };
  }catch (err) {
     console.error("POST /launches failed:", err);
    return{
      ok: false,
      message: err.message,
    }
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try{
    const response = await fetch(`${API_URL}/:id`, {
      method: 'DELETE',
    });
    return await response.json();
  }catch (err){
    console.error("DELETE /launches failed:", err);
    return{
      ok: false,
      message: err.message,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};