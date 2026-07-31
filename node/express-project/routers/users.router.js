const express = require('express');
const {getUsers, getUser, postUser} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.use((req, res, next)=>{
    console.log('IP adress:', req.ip)
    next();
})

//user End Point 
userRouter.post('/',postUser);
userRouter.get('/:id',getUser);
userRouter.get('/',postUser);

module.exports = userRouter