var app = require('express')();
var https = require('https');

var clientId = '1fe1ac6261a105f3ee49';
var clientSecret = '1bb7b9145181033a592d38630ef3591880ae096a';

app.get('/', function(req, res) {
  res.redirect('https://github.com/login/oauth/authorize/?client_id=' + clientId);
});

app.get('/token', function(req, res) {
  console.log(req.query.code);
  var options = {
    host: 'github.com',
    path: '/login/oauth/access_token?client_id=' +
      clientId + '&client_secret=' + clientSecret + '&code=' +
      req.query.code,
    method: 'POST'
  };

  var postData = JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code
  });

  var sendOauth = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      console.log('RES: ' + chunk);
    });
    res.on('end', function() {
      console.log('end');
    });
    console.log(res);
  });
  sendOauth.on('err', function(e) {
    console.log('problems: ' + e.message);
  });
  sendOauth.write(postData);
  sendOauth.end();
});

app.listen(3000, function() {
  console.log('up and running');
});

