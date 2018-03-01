var resources = require('./../../resources/model.js');
var actuator, interval;
var model = resources.temperature;

var pluginName = model.name;
var localParams = { 'simulate': false, 'frequency': 2000 };
var proxy;

exports.start = function(params) {
	localParams = params;
	// observe(model);

	if (localParams.simulate) {
		interval = setInterval(function() {
			// Switch value on a regular basis
			if (model.value) {
				model.value = false;
			} else {
				model.value = true;
			}
		}, localParams.frequency);
		console.info('Simulated %s actuator started!', pluginName);
	} else {
		var Gpio = require('onoff').Gpio;
		actuator = new Gpio(model.gpio, 'out');
		console.info('Hardware %s actuator started!', pluginName);
	}
};

exports.stop = function() {
	if (localParams.simulate) {
		clearInterval(interval);
	} else {
		actuator.unexport();
	}
	console.info('%s plugin stopped!', pluginName);
};

exports.switchOnOff = function(value) {
	if (!localParams.simulate) {
		actuator.write(value === true ? 1 : 0, function() {
			console.info('Changed value of %s to %s', pluginName, value);
		});
	}
};

function observe(what) {
	Object.observe(what, function(changes) {
		console.info('Change detected by plugin for %s...', pluginName);
		switchOnOff(model.value);
	});
}
