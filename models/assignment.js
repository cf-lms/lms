var mongoose = require('mongoose');

var assignmentSchema = new mongoose.Schema({
  type: {type: String, required: true},
  description: String,
  courseID: String
});

module.exports = exports = mongoose.model('Assignment', assignmentSchema);
