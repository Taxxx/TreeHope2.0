$(document).ready(function(){
	console.log('main.js loaded');

	//cargo Pony
	window.ponyExpress = new PonyExpress({
		io: window.location.origin
	});

	window.ponyExpress.bind('connect', function(){
		window.plugs.Post = new PonyExpress.BackbonePlug({
			collection : window.collections.Posts
		});
	});
	//cargo vistas
	window.views.app = new TreeHope.Views.App( $('body') );
	//cargo routes
	window.routers.base = new TreeHope.Routers.Base();
	//cargo collections
	window.collections.Posts = new TreeHope.Collections.Posts();

	//adiciono nuevo Post
	window.collections.Posts.on('add', function(model){
		//agregar nuevas vistas de articulos
		var view = new TreeHope.Views.Post({model: model});

		view.render();
		//view.$el.prependTo('.posts');
		$('.posts').prepend(view.$el);
	});
	// carga de mi base de datos fake
	var xhr = window.collections.Posts.fetch();
	xhr.done(function(){
		Backbone.history.start({
			root: '/',
			pushState: true
		});
	});
});
