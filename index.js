// Creates an express application
var express = require('express');
var app = express(); // top-level function exported by the express module

var bodyParser = require('body-parser');

var users = require('./routes/users.js');
var exercises = require('./routes/exercises.js');
var orders = require('./routes/orders.js');

app.all('/*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	next();
});

// use middleware which serves files from given 'public' directory
app.use(express.static('public'));


// req.body contains key-value pairs of data submitted in the request body. 
// By default, it is undefined, and is populated when you use body-parsing middleware such as body-parser and multer.
app.use(bodyParser.urlencoded({
    extended: true //allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). 
    				//The "extended" syntax allows for rich objects such as a JSON with URL-encoded
    			}));
app.use(bodyParser.json());

app.use('/api/users/', users);
app.use('/api/exercises/', exercises);
app.use('/api/orders/', orders);

app.listen(process.env.PORT || 3000);
