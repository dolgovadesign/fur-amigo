const express = require('express');
const arduino = require('../arduino');

const router = express.Router();

function sendCommand(command, res) {
  arduino.send(command, error => (error && console.log(`Failed to send message ${command} to FurAmigo`)) || res.status(200));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to FurAmigo!').status(200);
});

router.post('/reset', (req, res) => {
  console.log(`Reset requested`);
  sendCommand('reset', res);
});

router.post('/earsup', (req, res) => {
  console.log(`Ears Up requested`);
  sendCommand('raiseears', res);
});

router.post('/earsdown', (req, res) => {
  console.log(`Ears Down requested`);
  sendCommand('lowerears', res);
});

router.post('/earsflapping', (req, res) => {
  console.log(`Ears Flapping requested`);
  sendCommand('flapears', res);
});

router.post('/shakeleftpaw', (req, res) => {
  console.log(`Shake Left Paw requested`);
  sendCommand('shakeleftpaw', res);
});

router.post('/shakerightpaw', (req, res) => {
  console.log(`Shake Right Paw requested`);
  sendCommand('shakerightpaw', res);
});

module.exports = router;
