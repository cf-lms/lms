require('isomorphic-fetch');
var types = require(__dirname + '/../constants/action_types');

module.exports.userSignup = function() {
  return function(dispatch, getState) {
    var state = getState();

    return fetch('/auth')
      .then(function(result) {
        if (result.status === 200) {

          // set cookie
          // return username and token

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
