var mongoose = require('mongoose');

var assignmentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: String,
  description: String,
  courseID: String,
  url: String,
  dueDate: Date
});

module.exports = exports = mongoose.model('Assignment', assignmentSchema);
