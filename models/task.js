// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var taskSchema = new Schema({
  name: {type: String, required:  [true, 'Task name is required']},
  description: { type: String},
});

// the schema is useless so far
// we need to create a model using it
var Task = mongoose.model('Task', taskSchema);

// make this available to our users in our Node applications
module.exports = Task;