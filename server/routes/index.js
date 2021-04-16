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
  sendCommand('0');
  res.send('OK').status(200);
});

router.post('/raiseears', (req, res) => {
  console.log(`Raise Ears requested`);
  sendCommand('1');
  res.send('OK').status(200);
});

router.post('/lowerears', (req, res) => {
  console.log(`Lower Ears requested`);
  sendCommand('2');
  res.send('OK').status(200);
});

router.post('/flapears', (req, res) => {
  console.log(`Flap Ears requested`);
  sendCommand('3');
  res.send('OK').status(200);
});

router.post('/shakeleftpaw', (req, res) => {
  console.log(`Shake Left Paw requested`);
  sendCommand('4');
  res.send('OK').status(200);
});

router.post('/shakerightpaw', (req, res) => {
  console.log(`Shake Right Paw requested`);
  sendCommand('5');
  res.send('OK').status(200);
});

router.post('/playstart', (req, res) => {
  console.log(`Start player requested`);
  sendCommand('6');
  res.send('OK').status(200);
});

router.post('/playstop', (req, res) => {
  console.log(`Stop player requested`);
  sendCommand('7');
  res.send('OK').status(200);
});

router.post('/playnext', (req, res) => {
  console.log(`Next track requested`);
  sendCommand('8');
  res.send('OK').status(200);
});

router.post('/playtrack', (req, res) => {
  console.log(`Play track #${req.query.track} requested`);
  sendCommand(`P${req.query.track}`);
  res.send('OK').status(200);
});

module.exports = router;
