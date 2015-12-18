require('isomorphic-fetch');

var types = require(__dirname + '/../constants/action_types');

module.exports.requestAssignments = function() {
  return {
    type: REQUEST_ASSIGNMENTS,
  }
}

module.exports.fetchAssignments = function() {
  return function(dispatch, getState) {
    var state = getState();
    var id = state.user._id;

    // tell state that fetch is starting
    dispatch(requestAssignments);

    return fetch('/api/assignments/' + id)
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
  }
}

module.exports.receiveAssignments = function(json) {
  return {
    type: RECEIVE_ASSIGNMENTS,
    items:[],
    receivedAt: Date.now()
  }
}

// TODO create action for AJAX error handling



