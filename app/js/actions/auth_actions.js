require('isomorphic-fetch');
var types = require(__dirname + '/../constants/action_types');

module.exports.userSignup = function() {
  return function(dispatch, getState) {
    var state = getState();
    var id = state.user._id;

    // tell state that fetch is starting
    dispatch(requestAssignments);

    return fetch('/auth')
      .then(function(result) {
        if (result.status === 200) {
          return result.json();
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
