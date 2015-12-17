var express = require('express');
var handleError = require(__dirname + '/../lib/handle_server_error.js');
var jsonParser = require('body-parser').json;
var User = require(__dirname + '/../models/user.js');

var userRouter = module.exports = exports = express.Router();

//Signin will all be handled by Githubs OAuth. We just want to save what users have logged in.

userRouter.post('/signup', jsonParser(), function(req, res) {
  var newUser = new User(req.body);

  newUser.save(function(err, data) {
    if (err) return handleError(err, res);

    res.send(data);
  });
});

userRouter.put('/users/:id', jsonParser(), function(req, res) {
  var userData = req.body;
  delete userData._id;

  User.update({_id: req.params.id}, userData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'updated'});
  });
});

userRouter.delete('/users/:id', jsonParser(), function(req, res) {

  User.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'deleted'});
  });
});
