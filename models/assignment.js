var mongoose = require('mongoose');

var assignmentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: String,
  description: String,
  courseID: String,
  url: String,
  dueDate: Date,
  turnedIn: {type: Boolean, default: false}
});

module.exports = exports = mongoose.model('Assignment', assignmentSchema);
