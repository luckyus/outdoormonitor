var express = require('express');
var actuatorsRoutes = require('./../routes/actuators');
var sensorRoutes = require('./../routes/sensors');
var resources = require('./../resources/model');
var cors = require('cors');

var app = express();

app.use(cors());

app.use('/api/v1/actuators', actuatorsRoutes);
app.use('/api/v1/sensors', sensorRoutes);

app.get('/api', (req, res) => {
	res.send('Hop Yat Church Outdoor Display Monitor');
});

module.exports = app;