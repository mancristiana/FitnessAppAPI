// Creates an express application
var express = require('express');
var app = express(); // Top-level function exported by the express module

var bodyParser = require('body-parser');

var users = require('./routes/users.js');
var exercises = require('./routes/exercises.js');
var plans = require('./routes/plans.js');

// Access-Control error fix http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
app.all('/*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	next();
});

// Use middleware which serves files from given 'public' directory
app.use(express.static('public'));


// Use body-parsing middleware for JSON like experience with URL-encoded
// Extended syntax uses qs library (when true) and querystring library (when false)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all(function(error, req, res, next) {
	 //Catch bodyParser error
    if (error.message === "invalid json") {
        res.status(400).send({ "error": "400 <br>Wrongly formated <code>json</code> was sent" });
    } else {
        next();
    }
});

// For specified path use required modules
app.use('/api/users/', users);
app.use('/api/exercises/', exercises);
app.use('/api/users/:user_id/plans', plans);

app.listen(process.env.PORT || 3000);
