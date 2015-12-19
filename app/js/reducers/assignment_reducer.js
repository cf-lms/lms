var types = require(__dirname + '/../constants/action_types');
var assign = require('object-assign');

var initialState = {
  current: {
    isFetching: false,
    data: [{title: 'Some assignment from the store', id: 123}],
    lastUpdated: '',
    expand: true,
    header: 'Due Right Now',
    context: 'current'
  },
  upcoming: {
    isFetching: false,
    data: [{title: 'some upcoming assignment', id: 456}],
    lastUpdated: '',
    expand: true,
    header: 'Due Later',
    context: 'upcoming'
  },
  late: {
    isFetching: false,
    data: [{title: 'some late assignment', id: 789}],
    lastUpdated: '',
    expand: true,
    header: 'Past Due',
    context: 'late'
  }
};

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

    case types.HANDLE_EXPAND_CLICK:
      state[action.context].expand = action.expand;
      console.log(state);
      return state;

    default:
      return previousState;
  }
};
