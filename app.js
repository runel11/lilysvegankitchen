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
});

//recipes route
app.get('/recipes', (req, res) => {
	res.render('recipes');
});

//blog route
app.get('/blog', (req, res) => {
	res.render('blog');
});




//START SERVER
app.listen(8080, () => {
	console.log('Server started on port 8080');
});