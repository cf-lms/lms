var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
var options = {
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS : 30000
    }
  }
};

/*
 * Mongoose uses a different connection string format than MongoDB's standard.
 * Use the mongodb-uri library to help you convert from the standard format to
 * Mongoose's format.
 */

if ((process.env.NODE_ENV === 'development') || (process.env.NODE_ENV === undefined)) {
  mongoose.connect('mongodb://localhost/lms_dev');
}

if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/lms_test');
}

if (process.env.NODE_ENV === 'production') {
  var mongodbUri = process.env.MONGOLAB_URI;
  var mongooseUri = uriUtil.formatMongoose(mongodbUri);
  mongoose.connect(mongooseUri, options);
}
