var mongoose = require('mongoose');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  username: {type: String, index: true, unique: true},
  admin: {type: Boolean, default: false},
  token: String
});

userSchema.methods.storeToken = function(token, cb) {
  var id = this.id;

  eat.encode({id: id}, process.env.APP_SECRET, cb);
};

module.exports = exports = mongoose.model('User', userSchema);

