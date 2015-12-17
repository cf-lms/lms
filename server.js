var express = require('express');
var app = express();
var authRouter = require(__dirname + '/routes/auth_routes');

app.use('/', express.static(__dirname + '/build'));
app.use('/auth', authRouter);

app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server Up');
});

