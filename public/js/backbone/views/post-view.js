TreeHope.Views.Post = Backbone.View.extend({
	events:{
		"click .acciones .votos .up" : "upvote",
		"click .acciones .votos .down" : "downvote",
		"click" : "navigate" 
	},
	tagName: "post",
	className: "post",
	initialize: function(){
		//debugger;
		var self = this;
		//cambio modelo
		this.model.on('change', function(){
			if(window.app.state === "postSingle"){
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

		window.routers.base.on('route:postSingle', function(){
			if(window.app.post === self.model.get('id')){
				//Muestra version extendida
				self.extendedRender();
			}else{
				self.$el.hide();
			}
		});

		//cargar templates
		this.template = _.template($("#post-template").html());
		//this.template = swig.compile($('#post-template').html());
		this.extendedtemplate = _.template($("#post-extended-template").html());
	},
	render: function(){
		//debugger;
		var data = this.model.toJSON();
		//junto data con template
		var html = this.template(data);
		//debugger;
		//console.log('Chequemos el data --> '+data);
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
		Backbone.history.navigate('/post/'+this.model.get('id'), {trigger:true});
	}
});