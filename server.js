var express = require('express');
var app = express();
var mongoose = require('mongoose');
var courseRouter = require(__dirname + '/routes/course_routes');
var assignmentRouter = require(__dirname + '/routes/assignment_routes');
var authRouter = require(__dirname + '/routes/auth_routes');
var gitRouter = require(__dirname + '/routes/git_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/lms_dev');

app.use('/', express.static(__dirname + '/build'));
app.use('/api', courseRouter);
app.use('/api', assignmentRouter);
app.use('/auth', authRouter);
app.use('/git', gitRouter);

app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server Up');
});

