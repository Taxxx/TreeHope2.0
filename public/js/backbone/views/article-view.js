Puls3.Views.Article = Backbone.View.extend({
	events:{
		"click .acciones .votos .up" : "upvote",
		"click .acciones .votos .down" : "downvote",
		"click" : "navigate" 
	},
	tagName: "article",
	className: "post",
	initialize: function(){
		//debugger;
		var self = this;
		//cambio modelo
		this.model.on('change', function(){
			if(window.app.state === "articleSingle"){
				self.extendedRender();
			}else{
				self.render();
			}
		});
		//cambia estado de aplicacion
		window.routers.base.on('route:root', function(){
			self.$el.css('display', '');
			self.render();
		});

		window.routers.base.on('route:articleSingle', function(){
			if(window.app.article === self.model.get('id')){
				//Muestra version extendida
				self.extendedRender();
			}else{
				self.$el.hide();
			}
		});

		//cargar templates
		this.template = _.template($("#article-template").html());
		//this.template = swig.compile($('#article-template').html());
		this.extendedtemplate = _.template($("#article-extended-template").html());
	},
	render: function(){
		var data = this.model.toJSON();
		//junto data con template
		var html = this.template(data);

		this.$el.html(html);
	},
	extendedRender: function(){
		var data = this.model.toJSON();
		//hacer cosas fancy ***
		var html = this.extendedtemplate(data);
		this.$el.html(html);
		
	},
	upvote: function(e){
		e.preventDefault();
		e.stopPropagation();

		var votes = parseInt(this.model.get('votes'),10);
		this.model.set('votes', ++votes);
		this.model.save();
		//debugger;
	},
	downvote: function(e){
		e.preventDefault();
		e.stopPropagation();

		var votes = parseInt(this.model.get('votes'),10);
		this.model.set('votes', --votes);
		this.model.save();
	},
	navigate: function(){
		Backbone.history.navigate('/article/'+this.model.get('id'), {trigger:true});
	}
});