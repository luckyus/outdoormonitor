var express = require('express');
var actuatorsRoutes = require('./routes/actuators');
var sensorRoutes = require('./routes/sensors');
var resources = require('./resources/model');
var dhtPlugin = require('./plugins/internal/DHT22SensorPlugin');
var ledsPlugin = require('./plugins/internal/ledsPlugin');
var cors = require('cors');
var converter = require('./middleware/converter');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1/actuators', actuatorsRoutes);
app.use('/api/v1/sensors', sensorRoutes);

app.get('/api/v1', (req, res) => {
	res.send(resources);
});

app.get('/', (req, res) => {
	res.send('Hop Yat Church Outdoor Display Monitor');
});

app.use(converter());

dhtPlugin.start({ 'simulate': false, 'frequency': 2000 });
ledsPlugin.start({ 'simulate': true, 'frequency': 5000 });

var server = app.listen(resources.pi.port, () => {
	console.info('Hop Yat Church Outdoor Display at %s', resources.port);
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