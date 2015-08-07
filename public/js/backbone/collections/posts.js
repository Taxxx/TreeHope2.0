TreeHope.Collections.Posts = Backbone.Collection.extend({
	model: TreeHope.Models.Post,
	url: '/posts/',
	name: 'posts'
});