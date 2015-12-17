var mongoose = require('mongoose');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  username: {type: String, require: true, index: true, unique: true},
  admin: {type: Boolean, default: false},
  courseID: String,
  token: String
});

userSchema.methods.storeToken = function(cb) {
  var id = this.id;

  eat.encode({id: id}, process.env.APP_SECRET, cb);
};

module.exports = exports = mongoose.model('User', userSchema);

