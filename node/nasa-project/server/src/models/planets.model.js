const path = require("path");
const { parse } = require("csv-parse");
const fs = require("fs");

const NasaPlanet = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    Number(planet["koi_insol"]) > 0.36 &&
    Number(planet["koi_insol"]) < 1.11 &&
    Number(planet["koi_prad"]) < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    const savePromises = [];

    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
          skip_empty_lines: true,
        })
      )
      .on("data", (data) => {
        // console.log("CSV columns:", Object.keys(data));
        if (isHabitablePlanet(data)) {
          // console.log("Planet CSV data:", data.kepler_name);

          savePromises.push(savePlanets(data));
        }
      })
      .on("error", (error) => {
        console.error("Error reading CSV:", error);
        reject(error);
      })
      .on("end", async () => {
        try {
          // Wait for ALL MongoDB saves to complete
          await Promise.all(savePromises);

          const planets = await getAllPlanets();

          // console.log("Planets found:", planets.length);

          // console.log(
          //   "Total habitable planets:",
          //   planets.length
          // );

          // console.log(
          //   "Habitable planets:",
          //   planets.map((planet) => planet.keplerName)
          // );

          // console.log("Done reading file");

          resolve();
        } catch (error) {
          console.error("Error saving planets:", error);
          reject(error);
        }
      });
  });
}

async function getAllPlanets() {
  const planets = await NasaPlanet.find({},{
    "_id":0, "__v":0
  });

  return planets;
}

async function savePlanets(planet) {
  try {
    if (!planet.keplerName) {
      console.warn("Skipping planet without keplerName:", planet);
      return;
    }

    await NasaPlanet.updateOne(
      {
        keplerName: planet.keplerName,
      },
      {
        $set: {
          keplerName: planet.keplerName,
        },
      },
      {
        upsert: true,
        runValidators: true,
      }
    );

    console.log(`Saved planet: ${planet.keplerName}`);
  } catch (error) {
    console.error(
      `Could not save planet ${planet.keplerName}:`,
      error
    );
    throw error;
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};