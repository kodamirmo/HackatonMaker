Meteor.methods({


	playGame : function(){
		console.log('Init game');
		generateStep();
	}


});


function generateStep(){

	var coorsUser1 = {};
	var coorsUser2 = {};

	while( JSON.stringify(coorsUser1) == JSON.stringify(coorsUser2) ){

		coorsUser1 = generateCoors();
		coorsUser2 = generateCoors();

	}

	console.log("User 1: " + JSON.stringify(coorsUser1));
	console.log("User 2: " + JSON.stringify(coorsUser2));

	setTimeout(generateStep, 1000);
}

function generateCoors(){

	var corX = Math.floor((Math.random() * 4) + 1);
	var corY = Math.floor((Math.random() * 4) + 1);

	return {x:corX,y:corY};
}