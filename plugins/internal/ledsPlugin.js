var resources = require('./../../resources/model.js');
var model = resources.temperature;

var actuator, interval;

var pluginName = model.name;
var localParams = { 'simulate': false, 'frequency': 2000 };

var proxy = new Proxy(model, {
	get(target, key) {
		const v = target[key];
		return typeof v == "object" ? new Proxy(v, handler) : v;
	},
	set(target, key, value) {
		console.log(target);
		console.log(key);
		console.log(value);

		actuator.write(value === true ? 1 : 0, function() {
			console.info('Changed value of %s to %s', pluginName, value);
		});

		return Reflect.set(target, key, value);
	},
});

exports.start = function(params) {
	localParams = params;
	// observe(model);
	if (localParams.simulate) {
		interval = setInterval(function() {
			if (proxy.value) {
				proxy.value = false;
			} else {
				proxy.value = true;
			}
		}, localParams.frequency);
		console.info('Simulated %s actuator started!', pluginName);
	} else {
		var Gpio = require('onoff').Gpio;
		actuator = new Gpio(proxy.gpio, 'out');
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