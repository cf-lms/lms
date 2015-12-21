var express = require('express');
var request = require('superagent');
var handleErr = require(__dirname + '/../lib/handle_error');
var User = require(__dirname + '/../models/user');

var clientId = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;
var host = process.env.HOST;

var authRouter = module.exports = express.Router();

authRouter.get('/', function(req, res) {
  
  var redirect = 'https://github.com/login/oauth/authorize/'
    + '?client_id=' + clientId
    + '&scope=user,repo';
  res.status(302).set({'location': redirect, 'Access-Control-Allow-Origin': '*'});
  res.end();
});

authRouter.get('test', function(req, res) {
  res.json({token: 'hello world'});
});

authRouter.get('/token', function(req, res) {
  console.log(req.query);
  request
    .post((host || 'https://github.com') + '/login/oauth/access_token')
    .query({client_id: clientId})
    .query({client_secret: clientSecret})
    .query({code: req.query.code})
    .end(function(err, data) {
      if (err) return handleErr(err, res);

      var token = data.body.access_token;
      getUser(token);
    });

  function getUser(token) {
    request
      .get((host || 'https://api.github.com') + '/user')
      .query({access_token: token})
      .end(function(err, data) {
        if (err) return handleErr(err, res);
        
        var user = new User();
        user.username = data.body.login;
        user.token = token;
        saveUser(user, token);      
      });
  }

  function saveUser(user, token) {
    user.save(function(err, data) {
      if (err) return handleErr(err, res);

      user.generateToken(function(err, token) {
        if (err) return handleErr(err, res);

        res.json({token: token});
      });
    });
  }
});

