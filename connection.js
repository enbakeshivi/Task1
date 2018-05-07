var mongoose = require('mongoose');

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



/////////////////////////////
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