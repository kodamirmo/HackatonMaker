require('./utils/extensions.js')
var app = require('express')();
var http = require('http').Server(app);
var socket = require('socket.io')(http);
var express = require('express');

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');

http.listen(4000, function(){
  console.log('listening on *:4000');
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

socket.on('connection', function(socket){
  	socket.on('start', function(msg){
  		if(msg)	start_game(animate_board)		
  	});

  	socket.on('send my_sequence', function(my_sequence){
  		console.log(my_sequence, the_sequense)
  		if( my_sequence.equals(the_sequense) )
  			socket.emit('result', { "status": "winner" });
  		else
  			socket.emit('result', { "status": "looser" });
  	});	
});

var animate_board = function(the_sequense, callback){
	//codigo para animar la placa
	callback(the_sequense)
}

var start_game = function(callback){
	the_sequense = generate_sequence(4)
	callback(the_sequense, you_turn)
}

var you_turn = function(the_sequense){
	socket.emit('you turn', { "data": the_sequense });	
}

var generate_sequence = function(num){
	var MIN = 0,  
		MAX = 15,
		sequence = [];
	for (var i = 1; i <= num; i++){
		sequence.push( Math.floor(Math.random() * (MAX - MIN + 1)) + MIN );
	}
	console
	return sequence;
}