var express = require('express');
var request = require('superagent');
var handleErr = require(__dirname + '/../lib/handle_error');
var User = require(__dirname + '/../models/user');

var clientId = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;
var host = process.env.HOST;

var authRouter = module.exports = express.Router();

authRouter.get('/', function(req, res) {
  res.redirect('https://github.com/login/oauth/authorize/?client_id=' + clientId);
});

authRouter.get('/token', function(req, res) {
  request
    .post((host || 'https://github.com') + '/login/oauth/access_token')
    .query({client_id: clientId})
    .query({client_secret: clientSecret})
    .query({code: req.query.code})
    .end(function(err, data) {
      if (err) return handleErr(err, res);

      var token = data.body.access_token;

      request
        .get((host || 'https://api.github.com') + '/user')
        .query({access_token: token})
        .end(function(err, data) {
          if (err) return handleErr(err, res);

          var user = new User();
          user.username = data.body.login;
          user.token = token;
          
          user.save(function(err, info) {
            if (err) return handleErr(err, res);

            user.storeToken(function(err, token) {
              if (err) return handleErr(err, res);

              res.json({token: token});
            });
          });
        });
    });
});

