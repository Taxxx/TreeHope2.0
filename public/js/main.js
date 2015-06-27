$(document).ready(function(){
	console.log('main.js loaded');

	//cargo Pony
	window.ponyExpress = new PonyExpress({
		io: window.location.origin
	});

	window.ponyExpress.bind('connect', function(){
		window.plugs.article = new PonyExpress.BackbonePlug({
			collection : window.collections.articles
		});
	});
	//cargo vistas
	window.views.app = new Puls3.Views.App( $('body') );
	//cargo routes
	window.routers.base = new Puls3.Routers.Base();
	//cargo collections
	window.collections.articles = new Puls3.Collections.Articles();

	//adiciono nuevo article
	window.collections.articles.on('add', function(model){
		//agregar nuevas vistas de articulos
		var view = new Puls3.Views.Article({model: model});

		view.render();
		//view.$el.prependTo('.posts');
		$('.posts').prepend(view.$el);
	});
	// carga de mi base de datos fake
	var xhr = window.collections.articles.fetch();
	xhr.done(function(){
		Backbone.history.start({
			root: '/',
			pushState: true
		});
	});
});
