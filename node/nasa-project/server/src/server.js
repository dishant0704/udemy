const http = require('http');
const port = process.env.PORT || 8000;
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const server = http.createServer(app);

async function startServer() {
    await loadPlanetsData();
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
}

startServer();