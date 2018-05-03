var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var logger = require('morgan');
var passport = require('passport')









app.set('views',__dirname+"/views");
// app.set('view engine','pug');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile)

// middlewares

var myResponse = function (req, res, next) {
  console.log("aaaaaaaa" ,res.body)
  next()
}

app.use(myResponse)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(logger('dev'));



app.use(session({ secret: '$#%!@#@@#SSDASASDVV@@@@', key: 'sid'}));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

// routes
require('./routes/main.js')(app);
//model
var Users = require('./models/user.js');
var Tasks = require('./models/task.js');




// database connection

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/test";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });


//Set up default mongoose connection

//localhost
// var mongoDB = "mongodb://localhost:27017/test";
var mongoDB = "mongodb://enbakeshivi:enbake123@ds113640.mlab.com:13640/todo"
mongoose.connect(mongoDB)
.then(() =>  console.log('connection succesful with database named test'))
.catch((err) => console.error(err));
// Get Mongoose to use the global promise library of Nodejs

mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// app listen

app.listen(5000,function(){
	console.log("Nodejs Server listening on port 5000.")
})