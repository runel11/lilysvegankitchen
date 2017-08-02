const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//temporary connection to local mongoDB for testing
mongoose.connect('mongodb://localhost/lilysvegankitchen');
let db = mongoose.connection;

//temporary check connection
db.once('open', () => {
	console.log('Connected to MongoDB');
});

//check for DB errors
db.on('error', (err) => {
	console.log(err);
});

//initialize application
const app = express();

//bring in models
let Recipe = require('./models/recipe');
let Post = require('./models/post');

//load view engine
//for local testing, __dirname is /lilysvegankitchen
//but when hosted by webserver it will just be the root
//path.join joins /lilysvegankitchen and views into
///lilysvegankitchen/views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Body Parser Middleware
//??????learn why I need the body parser middleware??????
//what purpose does it serve, and how would the code look
//differently if I chose to do the job by hand
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//tell express that the public folder contains the static files for the project
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
//home route
app.get('/', (req, res) => {
	res.render('index');

	
	/*let welcomePost = new Post();
	welcomePost.title = "Welcome to Lily's Vegan Kitchen";
	welcomePost.description = 'A delicious journey into the cuisine of the future!';
	welcomePost.body = 'Welcome to my blog! Thanks for stopping by. With this new website I hope to share with you my journey towards health. To me, health is all encompassing, and includes what you are putting into your body as well as how you treat yourself mentally and phsyically. Please feel free to subscribe and follow along for exciting and delicious content coming very soon!';
	welcomePost.imgPaths = ['veggieShot.jpg'];
	welcomePost.postType = 'thought';

	welcomePost.save((err) => {
		if(err) {
			console.log(err);
			return;
		}
	});*/
	

	//run this code once to populate the database a bit
	/*let friedRice = new Recipe();
	friedRice.name = 'Pineapple Fried Rice';
	friedRice.description = 'Traditional chinese fried rice with a pineapple tropical twist.';
	friedRice.ingredients = ['3 cups of white or brown rice', '1 pineapple', 'soy sauce', '2 cups of mixed and chopped peas, carrots, and corn'];
	friedRice.instructions = ['Rinse the rice thoroughly before steaming in rice cooker or boiling on the stove until appropriately cooked.', 'Cook the mixed veggies and rice in a wok for a few minutes before adding soy sauce and mixing well.', 'Turn off the heat and serve on plates, using a bowl to shape the rice onto the plates.'];
	friedRice.imgPaths = ['./public/media/friedRice.jpg'];
	friedRice.recipeType = 'entree';
	let potatoTacos = new Recipe();
	potatoTacos.name = 'Potato Tacos';
	potatoTacos.description = 'Tacos just like you know them, but with a crispy, barbecue flavored potato filling along with other delicious ingredients.';
	potatoTacos.ingredients = ['3 russett potatoes', 'barbecue sauce', 'corn tortillas', 'lettuce', 'salsa', 'avocado'];
	potatoTacos.instructions = ['Chop the potatoes until they are small pieces appropriate for a taco filling.', 'Slice the lettuce into thin strips.', 'Peel avocado, remove the seed, and mash into a guacamole texture before adding the corn and salsa to it and mixing well.', 'Cook the potatoes on the stove with the barbecue sauce until crispy.', 'Steam or microwave the corn tortillas until soft and compliant.', 'Fill each of the corn tortillas with an appropriate helping of the potato filling and guacamole mix before serving with optional vegan sour cream or hot sauce.'];
	potatoTacos.imgPaths = ['./public/media/potatoTacos.jpg'];
	potatoTacos.recipeType = 'entree';
	friedRice.save((err) => {
		if(err) {
			console.log(err);
			return;
		}
	});
	potatoTacos.save((err) => {
		if(err) {
			console.log(err);
			return;
		}
	});*/





});

//about route
app.get('/about', (req, res) => {
	res.render('about');
});


//recipes route
app.get('/recipes', (req, res) => {
	Recipe.find({}, (err, recipes) => {
		if(err) {
			console.log(err);
			return;
		} else {
			res.render('recipes', {
				recipes: recipes
			});
		}
	});
});

//get the requested recipe
app.get('/recipes/:id', (req, res) => {
	Recipe.find(req.params.id, (err, recipe) => {
		res.render('recipe', {
			recipe: recipe
		});
	});
});

//blog route
app.get('/blog', (req, res) => {
	Post.find({}, (err, posts) => {
		if(err) {
			console.log(err);
			return;
		} else {
			res.render('blog', {
				posts: posts
			});
		}
	});
});

//get the requested blog post
app.get('/blog/:id', (req, res) => {
	Post.findById(req.params.id, (err, post) => {
		res.render('post', {
			post: post
		});
	});
});

//contact route
app.get('/contact', (req, res) => {
	res.render('about');
});

//adminlogin route
app.get('/adminlogin', (req, res) => {
	res.render('adminlogin');
});



//START SERVER
app.listen(8080, () => {
	console.log('Server started on port 8080');
});