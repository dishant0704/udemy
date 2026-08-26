const http = require("http");
const mongoose = require("mongoose");

const port = process.env.PORT || 8000;
const app = require("./app");

const connect = require("./mongoConfig/MongoDb");

const { loadPlanetsData } = require("./models/planets.model");

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  // console.log("MongoDB Connection is ready!");
});

mongoose.connection.on("error", (error) => {
  console.error(`MongoDB Connection error: ${error}`);
});

async function startServer() {
  try {
    await connect();

    await loadPlanetsData();

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();