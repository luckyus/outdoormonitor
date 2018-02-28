var express = require('express');
var router = express.Router();
var resources = require('./../resources/model');


router.route('/').get(function(req, res, next) {
    req.result = resources.pi.actuators;
    next();
});

router.route('/leds').get(function(req, res, next) {
    req.result = resources.pi.actuators.leds;
    next();
});

router.route('/leds/:id').get(function(req, res, next) {
    req.result = resources.pi.actuators.leds[req.params.id];
    console.log('get: ' + JSON.stringify(req.result));
    next();
}).put(function(req, res, next) {
    console.log('existing: ' + JSON.stringify(resources.pi.actuators.leds[req.params.id]));
    console.log('req.body.value: ' + req.body.value);
    if (req.body.value != undefined) {
        var selectedLed = resources.pi.actuators.leds[req.params.id];
        selectedLed.value = req.body.value;
        req.result = selectedLed;
        console.log('put: ' + JSON.stringify(req.result));
    }
    next();
});

module.exports = router;