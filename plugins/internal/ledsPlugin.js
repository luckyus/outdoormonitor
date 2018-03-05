var resources = require('./../../resources/model.js');
var model = resources.temperature;

var Gpio = require('onoff').Gpio;
var actuator = new Gpio(model.gpio, 'out');

var interval;

var pluginName = model.name;
var localParams = { 'simulate': false, 'frequency': 2000 };

var dummy = true;

exports.start = function(params) {
	localParams = params;
	// observe(model);
	if (localParams.simulate) {
		interval = setInterval(function() {
			if (dummy === true) {
				console.log('dummy changed fm true to false!');
				dummy = false;
			} else {
				console.log('dummy changed fm false to true!');
				dummy = true;
			}

			if (dummy === true) console.log('now it is true!');
			else console.log('now it is false!');

			/*
			actuator.write(model.value === true ? 1 : 0, function() {
				console.info('Changed value of %s to %s', pluginName, model.value);
			});
			*/
		}, localParams.frequency);
		console.info('Simulated %s actuator started!', pluginName);
	} else {
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

/*
function observe(what) {
	Object.observe(what, function(changes) {
		console.info('Change detected by plugin for %s...', pluginName);
		switchOnOff(model.value);
	});
}
*/