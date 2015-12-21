var express = require('express');
var request = require('superagent');
var parseJson = require('body-parser').json();
var parseMd = require('cadet-parser');
var handleErr = require(__dirname + '/../lib/handle_error');
var User = require(__dirname + '/../models/user');
var eatToken = require(__dirname + '/../lib/eat_token');
var git = require(__dirname + '/../lib/git_util');

var host = process.env.HOST || 'https://api.github.com';

var gitRouter = module.exports = express.Router();

gitRouter.post('/create/course', parseJson, function(req,res) {
  req.token = "f94990a2c26d7b568a5faa1dc53f11c94fb5d2dd";
  git.getReadme(req, function(contents) {
    parseMd(contents, function(courseData) {
      req.courseData = courseData;
      git.createCourse(req, function(err, data) {
        if (err) return handleErr(err, res);
        res.json(data); 
      })
    });
  });
});

gitRouter.put('/create/:repo/:path', parseJson, eatToken, function(req, res) {
  // add username to req in eatToken
  req.user = 'dabellator';
  req.b64Content = new Buffer(req.body.content).toString('base64');
  request
    .put(host + '/repos/' + req.user + '/' + req.params.repo + '/contents/' + req.params.path)
    .send({
      'message':req.body.message,
      'content':req.b64Content
    })
    .set('Authorization', 'token ' + req.token)
    .set('Content-Type', 'application/json')
    .end(function(err, data) {
      res.json(data);
    });
});

// change to get when auth is coming in header
gitRouter.post('/read/:repo/readme', parseJson, eatToken, function(req, res) {
  req.user = 'dabellator';
  request
    .get(host + '/repos/' + req.user + '/' + req.params.repo + '/readme')
    .set('Authorization', 'token ' + req.token)
    .end(function(err, data) {
      if (err) return handleErr(err, res);
      var payload = JSON.parse(data.text);
      var contents = new Buffer(payload.content, 'base64').toString();
      res.send(contents);
    });
});

