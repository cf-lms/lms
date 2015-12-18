var mongoose = require('mongoose');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  username: {type: String, require: true, index: true, unique: true},
  admin: {type: Boolean, default: false},
  courseID: String,
  token: String
});

userSchema.methods.generateToken = function(cb) {
  var token = this.token
  eat.encode({token: token}, process.env.APP_SECRET, cb);
};

module.exports = exports = mongoose.model('User', userSchema);

