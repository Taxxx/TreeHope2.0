var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var PostSchema =  Schema({
	id: 	    { type: String },
	title: 	    { type: String },
	image:		{ type: Number },
	username: 	{ type: String },
	tag: 	    { type: String },
	votes:	    { type: Number },
	content: 	{ type: String }

});

module.exports = mongoose.model('post', PostSchema);