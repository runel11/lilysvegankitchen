let mongoose = require('mongoose');

//recipe schema
let recipeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	//description not required, if no description is
	//entered then the description can just be the first
	//portion of the body
	description: {
		type: String
	},
	ingredients: [{
		type: String,
		required: true
	}],
	//step 1: gather ingredients, step 2: mix ingredients, etc
	instructions: [{
		type: String,
		required: true
	}],
	//need to figure out how to store the images
	//either in a database or just on the web server??
	imgPaths: [{
		type: String,
		required: true
	}],
	//breakfast, drink, entree, dinner, snack, experimental, etc
	recipeType: {
		type: String,
		required: true
	}

});

let Recipe = module.exports = mongoose.model('Recipe', recipeSchema);