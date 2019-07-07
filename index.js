var express = require('express')
var app = express()
var http = require('http').createServer(app);
var port = 3001
var io = require('socket.io')(http)



app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('sendOffer', function(offer){
		
		console.log('Offer: ', offer);
		io.emit('offer', offer);
		
	});

	socket.on('sendAnswer', function(answer){
	
		console.log('Answer', answer);
		io.emit('answer', answer);
	});
	socket.on('iceCandidate', function(candidate){
		console.log('ICE CANDIDATE:', candidate);
		io.emit('iceCandidate', candidate);
	});

});



http.listen(port)
