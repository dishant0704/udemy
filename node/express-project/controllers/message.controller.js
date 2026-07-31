const path = require('path');

function sendMessage(req, res) {
  const message = req.body.message;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  res.status(200).json({ message: `Received message: ${message}` });
}

function getMessage(req, res) {
  path.join(__dirname,'..','public','01.jpg') //specify dir name, path or folder location, folder name, file name
  res.sendFile(path.join(__dirname,'..','public','01.jpg'));
  // res.status(200).json({ message: 'Hi ketan!' });
}

module.exports = {
  sendMessage,
  getMessage
};