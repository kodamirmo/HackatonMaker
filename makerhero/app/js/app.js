$(function() {  

	var socket = io.connect('http://localhost:4000');
	var my_sequence= [];
	level = 1;
	status = "win";

	 $( "#pantalla_intro" ).effect( "pulsate", "slow", function(){
	 	var that = $(this);
	 	setTimeout(function(){ 
	 		that.effect("puff", "slow", function(){
	 			$( "#pantalla_juego" ).toggle( "explode", 16)
	 		})	
	 	}, 600);

	 } );

	$(".tecla").on("click", function(){
		var num = parseInt( $(this).attr("id").split("_")[1] );
		my_sequence.push(num);
	})
	
	socket.on('you turn', function(data){
		if(data.init == false) return 

		$( ".tablero" ).css("display", "block")
		$(".message").text("")
		var time = 10;
		my_sequence = [];
		console.log("---- secuencia otiginal ----")
		console.log(data.sequense)
		

		console.log("---- start!!! ----")

		var myVar = setInterval( function(){ 
			$("#tiempo").text(time)
			time--;
			if(time == -2){
				clearInterval(myVar)
				$("#tiempo").text("")
				socket.emit('send my_sequence', my_sequence );
			}
		}, 1000);
		
	});

	socket.on('result', function(msg){
		if(status == "lose") return false
		
		console.log("---- secuencia del usuario ----")
		console.log(my_sequence)
		
		if(msg.status == "win"){
  			socket.emit('start', { level: ++level, init: true } );
		}else if(msg.status == "lose"){
			$( ".tablero" ).toggle( "explode" );
			
			$(".message").text( "GAME OVER" )
			$(".message").fadeIn("slow")

			level = 1;
			status = "lose";
		}

		console.log("---- result ----")
		console.log(msg)
	})
	


});  
  