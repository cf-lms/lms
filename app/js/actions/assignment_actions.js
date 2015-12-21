require('isomorphic-fetch');
var types = require(__dirname + '/../constants/action_types');


module.exports.fetchAssignments = function(callback) {
  return function(dispatch) {
    return fetch('http://localhost:3000/api/assignments')
      .then(function(res) {
        if (res.status <= 200 || res.status > 300) {
          return res.json();
        }
        throw 'request failed';
      })
      .then(function(jsonResult) {

        return dispatch(callback(jsonResult));
      })
      .catch(function(err) {
        console.log('unable to fetch assignments');
    });
  };
};


module.exports.receiveAssignments = function(json) {
  return {
    type: types.RECEIVE_ASSIGNMENTS,
    newAssignments: json
  };
};

module.exports.handleExpandClick = function(expand, context) {
  return {
    type: types.HANDLE_EXPAND_CLICK,
    expand: !expand,
    context: context
  };
};

// TODO create action for AJAX error handling



