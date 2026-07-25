const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send({
    message: 'Hello World!',
  });
});

app.get('/message', (req, res) => {
  res.send('Hi ketan!');
});

app.post('/message', (req, res) => {
    res.send('message updated!');
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});