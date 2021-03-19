const express = require('express');
const arduino = require('../arduino');

const router = express.Router();

function sendCommand(command) {
  arduino.send(command);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to FurAmigo!').status(200);
});

router.post('/reset', (req, res) => {
  console.log(`Reset requested`);
  sendCommand('reset');
  res.send('OK').status(200);
});

router.post('/earsup', (req, res) => {
  console.log(`Ears Up requested`);
  sendCommand('raiseears');
  res.send('OK').status(200);
});

router.post('/earsdown', (req, res) => {
  console.log(`Ears Down requested`);
  sendCommand('lowerears');
  res.send('OK').status(200);
});

router.post('/earsflapping', (req, res) => {
  console.log(`Ears Flapping requested`);
  sendCommand('flapears');
  res.send('OK').status(200);
});

router.post('/shakeleftpaw', (req, res) => {
  console.log(`Shake Left Paw requested`);
  sendCommand('shakeleftpaw');
  res.send('OK').status(200);
});

router.post('/shakerightpaw', (req, res) => {
  console.log(`Shake Right Paw requested`);
  sendCommand('shakerightpaw');
  res.send('OK').status(200);
});

module.exports = router;
