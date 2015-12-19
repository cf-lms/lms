require('isomorphic-fetch');
var types = require(__dirname + '/../constants/action_types');

module.exports.handleAuthClick = function() {
  return function(dispatch, getState) {
    var state = getState();

    return fetch('/auth')
      .then(function(result) {
        if (result.status === 200) {

          // set cookie
          // return username and token

          return {
            type: HANDLE_AUTH_CLICK,
            data: result.json()
          };
        }
        throw 'request failed';
      })
      .then(function(jsonResult) {
        dispatch(receiveAssignments(jsonResult));
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

