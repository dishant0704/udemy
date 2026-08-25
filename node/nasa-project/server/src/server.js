const http = require("http");
const mongoose = require("mongoose");

const port = process.env.PORT || 8000;
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const server = http.createServer(app);
const MONGODB_URI = "mongodb+srv://ketandutt_db_user:b4CGMFQtvOILldlB@cluster0.6ktl8zl.mongodb.net";

mongoose.connection.once('open', ()=>{
  console.log('MogoDb Connection is ready!')
});

mongoose.connection.on('error',(error)=>{
  console.error(`MogoDb Connection error: ${error}`)
})

async function startServer() {
  await mongoose.connect(MONGODB_URI);    
  await loadPlanetsData();
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
