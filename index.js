var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var users = require('./routes/users.js');
var exercises = require('./routes/exercises.js');
var orders = require('./routes/orders.js');

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
// Add headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/api/', users);
app.use('/api/', exercises);
app.use('/api/', orders);

app.listen(process.env.PORT || 3000);
