$(function() {  

	var socket = io.connect('http://192.168.1.82:4000');
	var my_sequence = [];

	$("#start").on("click", function(){
		socket.emit('start', {level: 1, init: true} );
		return false
	})


});  
  
