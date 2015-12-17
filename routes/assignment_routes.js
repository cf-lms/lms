var express = require('express');
var handleError = require(__dirname + '/../lib/handle_server_error.js');
var jsonParser = require('body-parser').json;
var Assignment = require(__dirname + '/../models/assignment.js');

var assignmentRouter = module.exports = exports = express.Router();

assignmentRouter.get('/all-assignments', function(req, res) {
  Assignment.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.send(data);
  });
});

assignmentRouter.post('/assignments', jsonParser(), function(req, res) {
  var newAssignment = new Assignment(req.body);
  newAssignment.save(function(err, data) {
    if (err) return handleError(err, res);

    res.send(data);
  });
});

assignmentRouter.put('/assignments/:id', jsonParser(), function(req, res) {
  var assignmentData = req.body;
  delete assignmentData._id;
  Assignment.update({_id: req.params.id}, assignmentData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'updated'});
  });
});

assignmentRouter.delete('/assignments/:id', jsonParser(), function(req, res) {
  Assignment.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'deleted'});
  });
});
