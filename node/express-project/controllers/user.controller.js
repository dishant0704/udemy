const {users} = require('../models/user.model')

function getUsers(req, res){
  res.json(users);
};

function getUser(req, res){
  const userId = parseInt(req.params.id);
  if(!userId) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }else { 
    return res.json(users.find(user => user.id === userId) || { error: 'User not found' });
  }
}

function postUser(req, res){
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required hi' })
  }
  const newUser = { 
    name: req.body.name,
    id: users.length + 1};

  users.push(newUser);
  res.status(201).json(newUser);  
}

module.exports = {
    getUsers,
    getUser,
    postUser
}