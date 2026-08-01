const express = require('express');
const path = require('path')

const messageRouter = require('./routers/messages.routes')
const userRouter = require('./routers/users.router')

const app = express();
const port = 3000;

//middleware 
app.use(function(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

app.set('view engine', 'hbs'); // it should be view engine not view-engine or views engine
app.set('views', path.join(__dirname, 'views'));

app.use('/site', express.static(path.join(__dirname, 'public')));
app.use(express.json());


// now use rout by using 'use' method:
//root end point 
// when we use layout.hbs file or template file then we do use res.render(...) only and we do not use res.send(...) 
// because res.send(...) is used for sending the response in the form of string or json but res.render(...) is 
// used for sending the response in the form of html page.

app.get('/', (req, res) => {
  res.render('index', { title: 'My First Page', myCaption: 'My first page' });
});

// messages
app.use('/message', messageRouter)

// users
app.use('/user', userRouter);
app.use('/users', userRouter);

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});