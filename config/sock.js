const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});

const api = require('../api');

var conn = function() {
	server.listen(8010);
	app.get('/', function(req, res) {
		console.log("get sock");
		res.sendfile(__dirname + './index.html');
	});
};

var fromClient = function() {
	console.log("hey");
	io.on('connection', function(socket) {
		socket.on('fromClient', function(data) {
			api.runSample(data.client).then(function(res) {
				console.log(res);
				socket.emit('fromServer', {server: res.fulfillmentText});
			});
		});
	});
}

module.exports = {conn, fromClient}