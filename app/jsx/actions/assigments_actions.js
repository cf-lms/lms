var types = require('../constants/action_types');

module.exports.requestAssignments = function() {
  return {
    type: REQUEST_ASSIGNMENTS,

  }
}

module.exports.requestAssignments = function() {
  return {
    type: RECEIVE_ASSIGNMENTS,
    receivedAt: Date.now()
  }
}

// TODO AJAX error handling

module.exports.invalidateAssignments = function() {
  return {
    type: INVALIDATE_ASSIGNMENTS,
    receivedAt: Date.now()
  }
}



