let mongoose = require('mongoose');

//blogPost schema
let blogPostSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	}
	body: {
		type: String,
		required: true
	},
	imgPaths: {
		type: Array,
		required: true
	},
	//recipe, thought, opinion, advice, exercise, quote, etc
	postType: {
		type: String,
		required: true
	}

});