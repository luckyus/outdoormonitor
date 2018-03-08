var WebSocketServer = require('ws').Server;
var resources = require('./../resources/model');

exports.listen = function(server) {
	var wss = new WebSocketServer({ server: server });
	console.info('WebSocket server started...');

	wss.onWebSocketOpen = function onWebSocketOpen(ws, req) {
		console.log(req.url);
	};

	wss.on('connection', function(ws, req) {
		var url = req.url;
		console.info(url);

		var interval;
		var currentValue = 0;

		try {
			interval = setInterval(function() {
				if (currentValue != resources.temperature.value) {
					currentValue = resources.temperature.value;
					console.log('ws sending currentValue: ' + currentValue);
					ws.send(JSON.stringify(resources.temperature), function() {});
				}
			}, 2000);
		} catch (e) {
			console.log('Unable to observe %s resource!', url);
		}
	});
};

function selectResouce(url) {
	var parts = url.split('/');
	parts.shift();
	var result = resources;
	for (var i = 0; i < parts.length; i++) {
		result = result[parts[i]];
	}
	return result;
}