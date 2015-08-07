TreeHope.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		"post/:id" : "postSingle"
	},
	root: function(){
		console.log('Estamos en el root de la app');

		window.app.state = "root";
		window.app.post = null;
	},
	postSingle: function(id){
		console.log('Estamos en postSingle');

		window.app.state = "postSingle";
		window.app.post = id;
	}
});