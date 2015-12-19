require('isomorphic-fetch');
var types = require(__dirname + '/../constants/action_types');

module.exports.handleAuthClick = function() {
  return function(dispatch, getState) {
    var state = getState();

    return fetch('http://localhost:3000/auth')
    .then(function(res) {
        if (res.status <= 200 && res.status > 300) {

          conlose.log('HOLY SHIT');
          // set cookie
          // return username and token

          return {
            type: HANDLE_AUTH_CLICK,
            data: res.json()
          };
        }
        throw 'request failed';
      })
      .then(function(jsonRes) {
        dispatch(receiveAssignments(jsonRes));
      })
      .catch(function(err) {
        console.log('unable to fetch assignments');
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

