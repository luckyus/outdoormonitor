var express = require('express');
var router = express.Router();
var resources = require('./../resources/model');


router.route('/').get(function (req, res, next) {
	req.result = resources.pi.actuators;
	next();
});

router.route('/leds').get(function (req, res, next) {
	req.result = resources.pi.actuators.leds;
	next();
});

router.route('/leds/:id').get(function (req, res, next) {
	req.result = resources.pi.actuators.leds[req.params.id];
	console.log('get: ' + req.result);
	next();
}).put(function (req, res, next) {
	var selectedLed = resources.pi.actuators.leds[req.params.id];
	selectedLed.value = req.body.value;
	req.result = selectedLed;
	console.log('put: ' + req.result);
	next();
});

module.exports = router;

