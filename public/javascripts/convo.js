var botui = new BotUI('api-bot');

var socket = io.connect('http://localhost:8010');

console.log("hello");

//initial reading
botui.message.add({
	content: "Let's start talking...",
	delay: 1500,
}).then(function() {
	botui.action.text({
		action: {
			placeholder: "Say Hello",
		}
	}).then(function(res) {
		console.log(res);
		socket.emit('fromClient', { client:res.value });
	}).then(function() {
		socket.on('fromServer', function(data) {
			console.log(data);
			botui.message.add({
				content: data.server,
				delay:500,
			});
			nextMessage();
		});
	});
});

//recursive loop function

function nextMessage() {
	botui.action.text({
		action: {
			placeholder: "Write your title query and years (if any) for your search."
		}
	}).then(function(res) {
		console.log(res);
		socket.emit('fromClient', { client:res.value });
	}).then(function() {
		socket.on('fromServer',function(data) {
			console.log(data);
			botui.message.add({
				content: data.server,
				delay:500,
			});
		});
	}).then(nextMessage())
}