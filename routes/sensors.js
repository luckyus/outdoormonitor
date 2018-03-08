var express = require('express');
var router = express.Router();
var resources = require('./../resources/model');

router.route('/').get((req, res, next) => {
	// res.send(resources.pi.sensors);
	req.result = resources.pi.sensors;
	next();
});

router.route('/temperature').get((req, res, next) => {
	// res.send(resources.pi.sensors.temperature);
	req.result = resources.pi.temperature;
	next();
});

router.route('/humidity').get((req, res, next) => {
	// res.send(resources.pi.sensors.humidity);
	req.result = resources.pi.sensors.humidity;
	next();
});

module.exports = router;