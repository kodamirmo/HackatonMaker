$(function() {  

	var socket = io.connect('http://localhost:4000');
	var my_sequence = [];

	$("#start").on("click", function(){
		socket.emit('start', {level: 1} );
		return false
	})


});  
  