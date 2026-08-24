const path = require("path");
const { parse } = require("csv-parse");
const fs = require("fs");

const Planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanets(data);
        }
      })
      .on("error", (error) => {
        console.log("Error reading CSV:", error);
        reject(error);
      })
      .on("end", async () => {
        try {
          const planets = await getAllPlanets();

          console.log("Total habitable planets:", planets.length);
          console.log(
            "Habitable planets:",
            planets.map((planet) => planet.keplerName)
          );

          console.log("Done reading file");

          resolve();
        } catch (error) {
          reject(error);
        }
      });
  });
}

async function getAllPlanets() {
  return await Planets.find({});
}

async function savePlanets(planet) {
  try {
    await Planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`Could not save planet: ${error}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};