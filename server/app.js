require('./utils/extensions.js')
var app = require('express')();
var http = require('http').Server(app);
var socket = require('socket.io')(http);
var express = require('express');
var gpio = require("pi-gpio");

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');

http.listen(4000, function(){
  console.log('listening on *:4000');
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

socket.on('connection', function(socket){
  	socket.on('start', function(data){
  		start_game(data, animate_board)		
  	});

  	socket.on('send my_sequence', function(my_sequence){
  		console.log(my_sequence, the_sequense)
  		
  		if( my_sequence.equals(the_sequense) ){
  			socket.emit('result', { "status": "win" });
  		}else{
  			socket.emit('result', { "status": "lose" });
  		}
  	});	
});

var animate_board = function(the_sequense, init, callback){

	turnOnLed(the_sequense,0);
	callback(the_sequense);

}

var start_game = function(data, callback){
	the_sequense = generate_sequence(data.level)
	callback(the_sequense, data.init, you_turn)
}

var you_turn = function(the_sequense, init){
	socket.emit('you turn', { "sequense": the_sequense, "init": init });	
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


initRaspberr();

var initRaspberr = function(){

	function errorOpenPin(pin){
		console.log("Error open pin: " + pin);
	}

	gpio.open(2, "output", errorOpenPin(2));
	gpio.open(3, "output", errorOpenPin(3));
	gpio.open(4, "output", errorOpenPin(4));
	gpio.open(5, "output", errorOpenPin(5));
	gpio.open(6, "output", errorOpenPin(6));
	gpio.open(7, "output", errorOpenPin(7));
	gpio.open(8, "output", errorOpenPin(8));
	gpio.open(9, "output", errorOpenPin(9));
	gpio.open(10, "output", errorOpenPin(10));
	gpio.open(11, "output", errorOpenPin(11));
	gpio.open(12, "output", errorOpenPin(12));
	gpio.open(13, "output", errorOpenPin(13));
	gpio.open(14, "output", errorOpenPin(14));
	gpio.open(15, "output", errorOpenPin(15));
	gpio.open(16, "output", errorOpenPin(16));

}

var turnOnLed = function(the_sequense,index){


	var casilla = the_sequense[index];

	console.log("Turn onLed " + casilla);

	var row = 0,
		collumn = 0;

	
	switch(Number(casilla)){

		case 0:
			row = 1;
			collumn =1;
		break;

		case 1:
			row = 1;
			collumn =2;
		break;

		case 2:
			row = 1;
			collumn =3;
		break;

		case 3:
			row = 1;
			collumn =4;
		break;

		case 4:
			row = 2;
			collumn =1;
		break;

		case 5:
			row = 2;
			collumn =2;
		break;

		case 6:
			row = 2;
			collumn =3;
		break;

		case 7:
			row = 2;
			collumn =4;
		break;

		case 8:
			row = 3;
			collumn =1;
		break;

		case 9:
			row = 3;
			collumn =2;
		break;

		case 10:
			row = 3;
			collumn =3;
		break;

		case 11:
			row = 3;
			collumn =4;
		break;

		case 12:
			row = 4;
			collumn =1;
		break;

		case 13:
			row = 4;
			collumn =2;
		break;

		case 14:
			row = 4;
			collumn =3;
		break;

		case 15:
			row = 4;
			collumn =4;
		break;	

	};

	index = ++index;

	var callback = function(){
		turnOnLed(the_sequense,index);
	};

	if(index < the_sequense.length)
		setTimeout(callback,1000);

}
