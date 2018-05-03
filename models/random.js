// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var todoSchema = new Schema({
  username: { type: String},
  email: {type: String, required: true, unique: true },
  password: { type: String, required: true },
});





// the schema is useless so far
// we need to create a model using it
var Todo = mongoose.model('Todo', todoSchema);

// make this available to our users in our Node applications
module.exports = Todo;



