var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var logger = require('morgan');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;




app.set('views',__dirname+"/views");
// app.set('view engine','pug');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile)

// middlewares


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(logger('dev'));



app.use(session({ secret: '$#%!@#@@#SSDASASDVV@@@@', resave:true , cookie:{maxAge:600000000}, saveUninitialized :false}));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

// routes
require('./routes/main.js')(app);
require('./connection.js');

//model
var Users = require('./models/user.js');
var Tasks = require('./models/task.js');


// app listen

app.listen(process.env.PORT || 5000,function(){
	console.log("Nodejs Server listening on port 5000.")
})