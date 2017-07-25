var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection',function(client){
	console.log('client connected..');

	client.emit('messages',{hello:'world'});

	client.on('messages',function(data){
		console.log(data["num1"]);
		console.log(data["num2"]);
		var x=parseInt(data["num1"])+parseInt(data["num2"]);
		console.log("sum = " + x);

		client.emit("sum",{"sum": x});
	});
});

app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});

server.listen(8080);