const { getAllPlanets } = require("../../models/planets.model");

async function httpGetAllPlanets(req, res) {
  try {
    const planets = await getAllPlanets();

    return res.status(200).json(planets);
  } catch (error) {
    
    console.error("Could not get planets:", error);

    return res.status(500).json({
      error: "Failed to get planets",
    });
  }
}

module.exports = {
  httpGetAllPlanets,
};
