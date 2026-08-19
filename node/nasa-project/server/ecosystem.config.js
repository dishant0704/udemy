module.exports = {
  apps: [
    {
      name: "nasa-project-api",
      script: "./src/server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        PORT: 5000
      }
    }
  ]
};