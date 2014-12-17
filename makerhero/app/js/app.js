$(function() {  

	var socket = io.connect('http://localhost:4000');
	var my_sequence= [];
	level = 1

	$(".tecla").on("click", function(){
		var num = parseInt( $(this).attr("id").split("_")[1] );
		my_sequence.push(num);
	})
	
	socket.on('you turn', function(data){
		$( ".tablero" ).css("display", "block")
		var time_out = 10;
		my_sequence = []
		console.log("---- secuencia otiginal ----")
		console.log(data.data)
		

		console.log("---- start!!! ----")

		var myVar = setInterval( function(){ 
			console.log(time_out);
			time_out--;
			if(time_out == 0){
				clearInterval(myVar)
				socket.emit('send my_sequence', my_sequence );
			}
		}, 1000);
	});

	socket.on('result', function(msg){
		console.log("---- secuencia del usuario ----")
		console.log(my_sequence)
		
		if(msg.status == "win"){
  			socket.emit('start', { level: ++level } );
		}else if(msg.status == "lose"){
			$( ".tablero" ).toggle( "explode" );
			
			$(".message").text( "GAME OVER" )
			$(".message").fadeIn("slow")

			level = 1

		}

		console.log("---- result ----")
		console.log(msg)
	})
	


});  
  