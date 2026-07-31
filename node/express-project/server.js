const express = require('express');
const path = require('path')

const messageRouter = require('./routers/messages.routes')
const userRouter = require('./routers/users.router')

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
app.use('/site', express.static(path.join(__dirname, 'public')));
app.use(express.json());


// now use rout by using 'use' method:
// messages
app.use('/message', messageRouter)

// users
app.use('/user', userRouter);
app.use('/users', userRouter);

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});