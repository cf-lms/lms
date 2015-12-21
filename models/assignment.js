var mongoose = require('mongoose');

var assignmentSchema = new mongoose.Schema({
  type: {type: String, required: true},
  name: String,
  dueDate: Date,
  turnedIn: {type: Boolean, default: false},
  courseID: String
});

module.exports = exports = mongoose.model('Assignment', assignmentSchema);
