require('isomorphic-fetch');
var types = require(__dirname + '/../constants/action_types');

module.exports.getToken = function(path) {
  return function(dispatch) {

    return fetch('http://localhost:3000/auth/token' + path)
    .then(function(res) {
        if (res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
        throw 'request failed';}
      })
      .then(function(resJson) {
        document.cookie = 'token=' + resJson.token;
        location.assign('/');
      })
      .catch(function(err) {
        console.log(err);
      });
  };
};

module.exports.loggedInStatus = function() {
  var state = getState();
  return {
    type: LOGGED_IN_STATUS,
    status: !state.loggedInStatus
  };
};

