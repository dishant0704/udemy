const API_URL = "http://localhost:8000";

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  // console.log("Planets data fetched successfully.");
  return await response.json();  
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
  }catch (error) {
     console.error("POST /launches failed:", error);
    return{
      ok: false,
      message: error.message,
    }
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try{
    const response = await fetch(`${API_URL}/launches/${id}`, {
      method: 'DELETE',
    });
    
    // if (!response.ok) {
    //   throw new Error(`DELETE failed: ${response.status}`);
    // }

    // const data = await response.text();

    // if (!text) {
    //   return {
    //     ok: true,
    //   };
    // }

    // return {
    //   ok: true,
    //   data: JSON.parse(text),
    // }
    
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