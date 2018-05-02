var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');



// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser());

require('./routes/main.js')(app);
app.set('views',__dirname+"/views");
// app.set('view engine','pug');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile)

app.use(session({ secret: '$#%!@#@@#SSDASASDVV@@@@', key: 'sid'}));
app.use(express.static(__dirname + '/public'));





//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB)
.then(() =>  console.log('connection succesful with database named test'))
.catch((err) => console.error(err));
// Get Mongoose to use the global promise library of Nodejs

mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))



app.listen(5000,function(){
	console.log("Nodejs Server listening on port 5000.")
})