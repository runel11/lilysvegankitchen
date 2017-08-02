let mongoose = require('mongoose');

//blogPost schema
let postSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	body: {
		type: String,
		required: true
	},
	imgPaths: [{
		type: String,
		required: true
	}],
	//recipe, thought, opinion, advice, exercise, quote, etc
	postType: {
		type: String,
		required: true
	}

});

let Post = module.exports = mongoose.model('Post', postSchema);