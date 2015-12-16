var express = require('express');
var handleError = require(__dirname + '/../lib/handle_server_error.js');
var jsonParser = require('body-parser').json;
var Course = require(__dirname + '/../models/course.js');


var courseRouter = module.exports = exports = express.Router();

courseRouter.get('/all-courses', function(req, res) {
  Course.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.send(data);
  });
});

courseRouter.get('/courses/:id', jsonParser(), function(req, res) {
  Course.find({_id: req.params.id}, function(err, data) {
    if (err) return handleError(err, res);

    res.send(data);
  });
});

courseRouter.post('/courses', function(req, res) {
  var newCourse = new Course(req.body);

  newCourse.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

courseRouter.put('/courses/:id', jsonParser(), function(req, res) {
  var courseData = req.body;
  delete courseData._id;
  Course.update({_id: req.params.id}, courseData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'updated'});
  });
});

courseRouter.delete('courses/:id', jsonParser(), function(req, res) {
  Course.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'deleted'});
  });
});
