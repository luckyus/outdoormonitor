var resources = require('./resources.json');
var ledsPlugin;

const handler = {
	get(target, key) {
		const v = target[key];
		return typeof v == "object" ? new Proxy(v, handler) : v;
	},
	set(target, key, value) {
		console.log(target);
		console.log(key);
		console.log(value);
		if (target.name === 'temperature' && key === 'value') {
			if (ledsPlugin == undefined) ledsPlugin = require('./../plugins/internal/ledsPlugin');
			ledsPlugin.switchOnOff(value);
		}
		return Reflect.set(target, key, value);
	},
};

module.exports = new Proxy(resources, handler);