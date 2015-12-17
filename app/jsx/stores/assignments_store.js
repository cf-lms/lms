var types = require('../constants/action_types');

var initialState = [
  user: '',
  populatedAssignmentCategories: ['current', 'upcoming', 'late'],
  assignments: {
    current: {
      isFetching: false,
      didInvalidate: false,
      items: [],
      lastUpdated: ''
    },
    upcoming: {
      isFetching: false,
      didInvalidate: false,
      items: [],
      lastUpdated: ''
    },
    late: {
      isFetching: false,
      didInvalidate: false,
      items: [],
      lastUpdated: ''
    }
  }
];

module.exports = function assignments(state, action) {
  var previousState = (state ? state : initialState);

  switch(action.type) {
    case types.ADD_ASSIGNMENT:
      return [{
        id:
        type:
        description:
        courseID:

      }].concat(previousState);
  }
}
