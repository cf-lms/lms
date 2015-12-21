require('isomorphic-fetch');
var types = require(__dirname + '/../constants/action_types');


module.exports.fetchAssignments = function(callback, secondCallback) {
  return function(dispatch) {
    return fetch('http://localhost:3000/api/assignments')
      .then(function(res) {
        if (res.status <= 200 || res.status > 300) {

          return res.json();
        }
        throw 'request failed';
      })
      .then(function(res) {
        return dispatch(callback(res, secondCallback));
      })
      .catch(function(err) {
        console.log('unable to fetch assignments');
    });
  };
};

module.exports.sortAssignments = function(assignments, callback) {

  var upcoming = [];
  var current = [];
  var late = [];
  var turnedIn = [];
  var now = new Date();
  var nextCoupleDays = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);

  for (var i = 0; i < assignments.length; i++) {
    var dueDate = new Date(assignments[i].dueDate);
    if(assignments[i].turnedIn === true) {
      turnedIn.push(assignments[i]);
    }

    if(dueDate < now) {
      late.push(assignments[i]);
    }

    if(dueDate > now && dueDate < nextCoupleDays) {
      current.push(assignments[i]);
    }

    if(dueDate > nextCoupleDays) {
      upcoming.push(assignments[i]);
    }
  }

  return callback(upcoming, current, late, turnedIn);
};

module.exports.receiveAssignments = function(upcoming, current, late, turnedIn) {
  return {
    type: types.RECEIVE_ASSIGNMENTS,
    upcoming: upcoming,
    current: current,
    late: late,
    turnedIn: turnedIn
  };
};

module.exports.handleSubmit = function(id, context, callback) {
  return function(dispatch) {
    return fetch('http://localhost:3000/api/assignments/' + id, {
      method: 'PUT',
      body: {turnedIn: true}
    })
      .then(function(res) {
        if (res.status <= 200 || res.status > 300) {

          dispatch(callback(id, context));
        }
        throw 'request failed';
      })
      .catch(function(err) {
        debugger;
        console.log('unable to update assignments');
    });
  };
};

module.exports.updateAssignments = function(id, context) {
  return {
    type: types.UPDATE_ASSIGNMENTS,
  _id: id,
  context: context
  };
};


module.exports.handleExpandClick = function(expand, context) {
  return {
    type: types.HANDLE_EXPAND_CLICK,
    expand: !expand,
    context: context
  };
};

