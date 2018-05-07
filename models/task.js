// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var taskSchema = new Schema({
  user_id:{type: Schema.Types.ObjectId, ref: 'Users'},
  name: {type: String, required:  [true, 'Task name is required']},
  description: { type: String},
  date: { type: Date, default: Date.now },
});

// the schema is useless so far
// we need to create a model using it
var Task = mongoose.model('Task', taskSchema);

// make this available to our users in our Node applications
module.exports = Task;