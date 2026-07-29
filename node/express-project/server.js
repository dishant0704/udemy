const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send({
    message: 'Hello World!',
  });
});

const users = [
  { id: 1, name: "Ketan" },
  { id: 2, name: "John" },
  { id: 3, name: "Jane" },
  { id: 4, name: "Alice" },
  { id: 5, name: "Bob" }
];

app.use(function(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

app.use(express.json());

app.post('/users', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required hi' })
  }
  const newUser = { 
    name: req.body.name,
    id: users.length + 1};

  users.push(newUser);
  res.status(201).json(newUser);  
})

app.get('/message', (req, res) => {
  res.send('Hi ketan!');
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  if(!userId) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }else { 
    return res.json(users.find(user => user.id === userId) || { error: 'User not found' });
  }
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});