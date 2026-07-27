const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send({
    message: 'Hello World!',
  });
});

const users = [
  { id: 1, name: 'Ketan' },
  { id: 2, name: 'John' },
  { id: 3, name: 'Jane' },
];

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

app.post('/message', (req, res) => {
    res.send('message updated!');
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});