var express = require('express');
var mongoose = require('mongoose');
var app = express();

app.use('/', express.static(__dirname + '/build'));

app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server Up');
});
