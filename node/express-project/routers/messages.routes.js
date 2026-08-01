const express = require('express');

//import controller
const {getMessage, sendMessage} = require('../controllers/message.controller');

//create rout for messages
const messageRouter = express.Router();
messageRouter.get('/', getMessage);
messageRouter.post('/', sendMessage);

module.exports = messageRouter;
