var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  weeks: Array
});

module.exports = exports = mongoose.model('Course', courseSchema);
