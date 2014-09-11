// setting up ------------------------------------------------------

var express        = require('express');
var app            = express();
var mongoose       = require('mongoose'); // for mongodb
var morgan         = require('morgan'); // log results to the console
var bodyParser     = require('body-parser'); // pull information from html POST
var methodOverride = require('method-override'); // simulate DELETE and PUT
var port           = process.env.PORT || 8080

// our db path -----------------------------------------------------

var database = require('./config/database.js');

// connecting to our database --------------------------------------

mongoose.connect(database.url);

// configuration ---------------------------------------------------

app.use(express.static(__dirname + '/public'));                 // setting the static files directory
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api as json
app.use(methodOverride());

// Models ----------------------------------------------------------

var Todo = mongoose.model('Todo', {
  text:  String
});

// Routes ----------------------------------------------------------

require('./routes.js')(app, Todo);

// listen with node ------------------------------------------------

app.listen(port);
console.log("The magic is happening on port " + port);
