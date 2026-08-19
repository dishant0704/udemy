const express = require("express");

const app = express();

function delay(md) {
  const start = Date.now();
  while (Date.now() - start < md) {
    // eventloop is blocked
  }
}

app.get("/", (req, res) => {
  res.send(`Performance Example ${process.pid}`);
});

app.get("/timer", (req, res) => {
  console.log(`/timer started on ${process.pid}`);
  delay(9000);
  console.log(`/timer finished on ${process.pid}`);
  res.send(`Zero downTime Restart by Reload  ${process.pid}`);
  res.send(`eventloop was blocked ${process.pid}`);
});
console.log(`Running server...`);
console.log(`Master ${process.pid} is running`);
console.log(`Worker ${process.pid} started`);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
