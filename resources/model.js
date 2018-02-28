var resources = require('./resources.json');

var handler = {
    get(target, key) {
		console.log(`getting key: ${key}`);
		return Reflect.get(target, key);
    },
    set(target, key, value) {
		return Reflect.set(target, key, value);
    }
};

module.exports = new Proxy(resources, handler);