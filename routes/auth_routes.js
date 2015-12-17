var express = require('express');
var https = require('https');
// this needs to be modifed to an env
var clientId = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;

var authRouter = module.exports = express.Router();

authRouter.get('/', function(req, res) {
  res.redirect('https://github.com/login/oauth/authorize/?client_id=' + clientId);
});

authRouter.get('/token', function(req, res) {
  var options = {
    host: 'github.com',
    path: '/login/oauth/access_token?client_id=' +
      clientId + '&client_secret=' + clientSecret + '&code=' +
      req.query.code,
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  };
  var postData = JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code
  });
  var sendOauth = https.request(options, function(authRes) {
    var data = '';
    authRes.setEncoding('utf8');
    authRes.on('data', function(chunk) {
      data += chunk;
    });
    authRes.on('end', function() {
      req.oauth = JSON.parse(data);
      // check for errors, store token and redirect

      // for test purposes
      res.json(req.oauth);
    });
  });

  sendOauth.on('err', function(e) {
    console.log('problems: ' + e.message);
  });
  sendOauth.write(postData);
  sendOauth.end();
});

