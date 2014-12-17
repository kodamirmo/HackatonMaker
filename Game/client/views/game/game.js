Template.game.rendered = function(){

	//Aqui se hace todo lo que se tenga que hacer cuando se acabe de cargar el DOM
	//Puedes usar jquery directo aqui sin hacer nada mas que escribirlo


};


Template.game.events({
	'click .tecla' : function(event){

    	var tecla = {};
    	tecla.row = $(event.target).data('row');
    	tecla.collumn = $(event.target).data('collumn');
    	console.log(tecla);
    	
	}

});