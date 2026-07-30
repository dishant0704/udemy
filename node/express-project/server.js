const express = require('express');
const {getMessage, sendMessage} = require('./controllers/message.controller');
const {getUsers, getUser, postUser} = require('./controllers/user.controller');

const app = express();
const port = 3000;

//root end point 
app.get('/', (req, res) => {
  res.send({
    message: 'Hello World!',
  });
});

//middleware 
app.use(function(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

app.use(express.json());

//Message End Point 
app.get('/message', getMessage);
app.post('/message', sendMessage);

//user End Point 
app.post('/user', postUser)
app.get('/users', getUsers);
app.get('/user/:id', getUser);

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});