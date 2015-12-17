var express = require('express');
var mongoose = require('mongoose');
var courseRouter = require(__dirname + '/routes/course_routes.js');
var assignmentRouter = require(__dirname + '/routes/assignment_routes.js');
var userRouter = require(__dirname + '/routes/user_routes.js');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/lms_dev');

app.use('/api', courseRouter);
app.use('/api', assignmentRouter);
app.use('/api', userRouter);

app.use('/', express.static(__dirname + '/build'));

app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server Up');
});
