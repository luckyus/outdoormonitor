var httpServer = require('./servers/http');
var resources = require('./resources/model');

var server = httpServer.listen(resources.pi.port, () => {
	console.info('Hop Yat Church Outdoor Display at %s', resources.pi.port);
});

/*
var Gpio = require('onoff').Gpio;
var sensor = new Gpio(17, 'in', 'both');

var http = require('http');
http.createServer((req, res) => {
	res.writeHeader(200, { 'Content-Type': 'text/plain' });
	res.end('Hello World!');
}).listen(3000);

process.on('SIGINT', () => {
	console.log('exit!');
	process.exit();
});

console.log('Church Monitor!');
*/

/*
var sensorLib = require('node-dht-sensor');

sensorLib.initialize(22, 12); 
var interval = setInterval(function () { 
	read();
}, 2000);

function read() {
	var readout = sensorLib.read(); 
	console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' + 'humidity: ' + readout.humidity.toFixed(2) + '%');
}

process.on('SIGINT', function () {
	clearInterval(interval);
	console.log('Exit...');
	process.exit();
});
*/
