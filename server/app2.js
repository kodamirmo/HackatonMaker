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
	//the_sequense = generate_sequence(20); //generate_sequence(data.level)
	the_sequense = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	callback(the_sequense, data.init, you_turn);
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


var initRaspberry = function(){

	var initPin = function(pin){

		console.log("Init pin: " + pin);

		gpio.open(pin, "output", function(err) {        
    		gpio.write(pin, 0, function() {         
        		//gpio.close(pin);                        
    		});
		});

	};


	//transistores
	initPin(3);
	initPin(5);
	initPin(7);
	initPin(29);

	//Fila 4
	initPin(31);   	//verde
	initPin(26);	//rojo

	//Fila 3
	initPin(24);	//verde
	initPin(21);	//rojo	

	//Fila 2
	initPin(19);	//verde	
	initPin(23);	//rojo

	//Fila 1
	initPin(32);	//verde	
	initPin(33);	//rojo


	//var callback = function(){
	//	turnOnPin(pin1,pin2);
	//}

	//var pin1 = 33;
	//var pin2 = 29;
	//setTimeout(callback,3000);

};

var turnOnPin = function(pin1, pin2){
	console.log("Turn ON pin: " + pin1 + " y " + pin2);
 	gpio.write(pin1, 1, function(){});
 	gpio.write(pin2, 1, function(){});
};

var turnOnLed = function(the_sequense,index){

	var casilla = the_sequense[index];

	console.log("Turn onLed " + casilla);

	var row = 0,
		collumn = 0;

	//31     24     19     32

	switch(Number(casilla)){


		case 0:
			row = 3;
			collumn = 0;
		break;

		case 1:
			row = 3;
			collumn = 1;
		break;

		case 2:
			row = 3;
			collumn = 2;
		break;

		case 3:
			row = 3;
			collumn = 3;
		break;




		case 4:
			row = 5;
			collumn = 0;
		break;

		case 5:
			row = 5;
			collumn = 1;
		break;

		case 6:
			row = 5;
			collumn = 2;
		break;

		case 7:
			row = 5;
			collumn = 3;
		break;




		case 8:
			row = 7;
			collumn = 0;
		break;

		case 9:
			row = 7;
			collumn = 1;
		break;

		case 10:
			row = 7;
			collumn = 2;
		break;

		case 11:
			row = 7;
			collumn = 3;
		break;




		case 12:
			row = 29;
			collumn = 0;
		break;

		case 13:
			row = 29;
			collumn = 1;
		break;

		case 14:
			row = 29;
			collumn = 2;
		break;

		case 15:
			row = 29;
			collumn = 3;
		break;

	};


	var color = Math.floor(Math.random() * (3 + 1));

	

	switch(collumn){

		case 0:

			switch(color){
				case 1: 
					gpio.write(31, 1, function(){});
				break;
				case 2: 
					gpio.write(26, 1, function(){});
				break;
				case 3: 
					gpio.write(31, 1, function(){});
					gpio.write(26, 1, function(){});
				break;
			};

		break;

		case 1:

			switch(color){
				case 1: 
					gpio.write(24, 1, function(){});
				break;
				case 2: 
					gpio.write(21, 1, function(){});
				break;
				case 3: 
					gpio.write(24, 1, function(){});
					gpio.write(21, 1, function(){});
				break;
			};
		
		break;

		case 2:
		
			switch(color){
				case 1: 
					gpio.write(19, 1, function(){});
				break;
				case 2: 
					gpio.write(23, 1, function(){});
				break;
				case 3: 
					gpio.write(23, 1, function(){});
					gpio.write(19, 1, function(){});
				break;
			};

		break;

		case 3:
		
			switch(color){
				case 1: 
					gpio.write(32, 1, function(){});
				break;
				case 2: 
					gpio.write(33, 1, function(){});
				break;
				case 3: 
					gpio.write(32, 1, function(){});
					gpio.write(33, 1, function(){});
				break;
			};

		break;

	};

	gpio.write(row, 1, function(){});
	

	var callback = function(){
		turnOnLed(the_sequense,index);
	};

	var callbackApagar = function(){
		gpio.write(3, 0, function(){});
		gpio.write(5, 0, function(){});
		gpio.write(7, 0, function(){});
		gpio.write(29, 0, function(){});
		gpio.write(31, 0, function(){});
		gpio.write(26, 0, function(){});
		gpio.write(24, 0, function(){});
		gpio.write(21, 0, function(){});
		gpio.write(19, 0, function(){});
		gpio.write(23, 0, function(){});
		gpio.write(32, 0, function(){});	
		gpio.write(33, 0, function(){});
	}

	if(index < the_sequense.length)
		setTimeout(callbackApagar,950);

	index = ++index;

	if(index < the_sequense.length)
		setTimeout(callback,1000);

}


initRaspberry();
