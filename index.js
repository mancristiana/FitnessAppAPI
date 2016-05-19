var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var users = require('./routes/users.js');
var products = require('./routes/products.js');
var orders = require('./routes/orders.js');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/api/', users);
app.use('/api/', products);
app.use('/api/', orders);

app.listen(process.env.PORT ||3000);
