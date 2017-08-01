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
	//step 1: gather ingredients, step 2: mix ingredients, etc
	instructions: {
		type:String,
		required: true
	},
	//need to figure out how to store the images
	//either in a database or just on the web server??
	imgPaths: {
		type:Array,
		required: true
	},
	//breakfast, drink, entree, dinner, snack, experimental, etc
	recipeType: {
		type:String
		required: true
	}

});