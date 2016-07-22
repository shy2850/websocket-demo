
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 3000 });

var allClient = [];
wss.on('connection', function connection(ws) {
	allClient.push(ws);
	ws.on('message', function incoming(message) {
		console.log('received: %s', message);
		allClient.forEach(function (client) {
			client.send(message);
		});
	});
	ws.on('close', function () {
		console.log('disconnected');
		var index = allClient.indexOf(ws);
		allClient.splice(index, 1)
	});
});