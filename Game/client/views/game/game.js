Template.game.rendered = function(){

	//Aqui se hace todo lo que se tenga que hacer cuando se acabe de cargar el DOM
	//Puedes usar jquery directo aqui sin hacer nada mas que escribirlo


};


Template.game.events({
	
	'click .tecla':function(e){
    	console.log($(this).attr("id") )
    	return false
	}

});