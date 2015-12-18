var types = require(__dirname + '/../constants/action_types');

var initialState = [{
  user: '',
  assignments: {
    current: {
      isFetching: false,
      items: [],
      lastUpdated: ''
    },
    upcoming: {
      isFetching: false,
      items: [],
      lastUpdated: ''
    },
    late: {
      isFetching: false,
      items: [],
      lastUpdated: ''
    }
  }
}];

module.exports = function assignments(state, action) {
  var previousState = (state ? state : initialState);

  switch(action.type) {
    case types.ADD_ASSIGNMENT:
      return [{
        id: '',
        type: '',
        description: '',
        courseID: ''
      }].concat(previousState);

    default:
      return previousState;
  }
};
