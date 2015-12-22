var eat = require('eat');
var User = require(__dirname + '/../models/user');

module.exports = function(req, res, next) {
  var token = req.cookies.token;
  if (!token) return res.status(401).json({msg: 'You shalt not pass'});
  eat.decode(token, process.env.APP_SECRET, function(err, decoded) {
    if (err) res.status(401).json({msg: 'You don\'t actually seem to be you'});
    req.token = decoded.token;
    next();
  });
};

