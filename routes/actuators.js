var express = require('express');
var router = express.Router();

var resources = require('./../resources/model');
var ledsPlugin = require('./../plugins/internal/ledsPlugin');

/*
const handler = {
	get(target, key) {
		const v = target[key];
		return typeof v == "object" ? new Proxy(v, handler) : v;
	},
	set(target, key, value) {
		if (target.name === 'led' && key === 'value') {
			ledsPlugin.switchOnOff(value);
		}
		return Reflect.set(target, key, value);
	},
};

var proxy =  new Proxy(resources, handler);
*/

router.route('/led').get(function(req, res, next) {
	req.result = resources.led;
	console.log('get: ' + JSON.stringify(req.result));
	next();
}).put(function(req, res, next) {
	if (req.body.value != undefined && typeof req.body.value == 'boolean') {
		// var selectedLed = proxy.led;
		var selectedLed = resources.led;
		selectedLed.value = req.body.value;
		req.result = selectedLed;

		ledsPlugin.switchOnOff(req.body.value);

		console.log('put: ' + JSON.stringify(req.result));
	}
	next();
});

module.exports = router;