

function sendMessage(req, res) {
  const message = req.body.message;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  res.status(200).json({ message: `Received message: ${message}` });
}

function getMessage(req, res) {
  res.status(200).json({ message: 'Hi ketan!' });
}

module.exports = {
  sendMessage,
  getMessage
};