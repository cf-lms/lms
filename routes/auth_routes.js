var express = require('express');
var request = require('superagent');
var handleErr = require(__dirname + '/../lib/handle_error');

var clientId = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;

var authRouter = module.exports = express.Router();

authRouter.get('/', function(req, res) {
  res.redirect('https://github.com/login/oauth/authorize/?client_id=' + clientId);
});

authRouter.get('/token', function(req, res) {
  request
    .post(process.env.ROUTE || 'https://github.com/login/oauth/access_token')
    .query({client_id: clientId})
    .query({client_secret: clientSecret})
    .query({code: req.query.code})
    .end(function(err, data) {
      if (err) return handleErr(err, res);
      // Need to build user DB to save token encrypt and save token
      res.json({token: data.body.access_token});
    });
});

