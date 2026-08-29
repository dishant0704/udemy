const http = require("http");
const app = require("./app");

const connect = require("./mongoConfig/MongoDb");

const {
  launch,
  saveLaunches,
} = require("./models/launches.model");

const {
  loadPlanetsData,
} = require("./models/planets.model");

const port = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  try {
    // Connect MongoDB
    await connect();

    console.log("MongoDB connection is ready!");

    // Load planets
    await loadPlanetsData();

    // Save initial/sample launch
    await saveLaunches(launch);

    console.log("Initial launch saved successfully");

    // Start API server
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();
