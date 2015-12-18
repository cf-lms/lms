var express = require('express');
var request = require('superagent');
var parseJson = require('body-parser').json();
var handleErr = require(__dirname + '/../lib/handle_error');
var User = require(__dirname + '/../models/user');
var eatToken = require(__dirname + '/../lib/eat_token');

var host = process.env.HOST || 'https://api.github.com';

var gitRouter = module.exports = express.Router();

gitRouter.post('/create/repo', parseJson, eatToken, function(req,res) {
  request
    .post(host + '/user/repos')
    .send({name: 'Beautiful', description: 'Best feeling.  Ever'})
    .set('Authorization', 'token ' + req.token)
    .end(function(err, data) {
      if (err) return handleErr(err, res);
      // sort of a placeholder, to be determined
      //console.log(data);
      res.json(data.body);
    });
});

