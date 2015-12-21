var types = require(__dirname + '/../constants/action_types');
var assign = require('object-assign');
var lodash = require('lodash');

var initialState = [
  {
    data: [{_id: 0, type: '', description: 'Some assignment from the store', courseID: ''}],
    expand: true,
    header: 'Due Right Now',
    context: 'current'
  },
  {
    data: [],
    expand: false,
    header: 'Due Later',
    context: 'upcoming'
  },
  {
    data: [{_id: 2, type: '', description: '', courseID: ''}],
    expand: false,
    header: 'Past Due',
    context: 'late'
  }
];

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
      return state.map(function(assignment) {
        if(assignment.context !== action.context) {
          return assignment;
        }
        return assign(
          {},
          assignment,
          {expand: action.expand}
        );
      });

    case types.RECEIVE_ASSIGNMENTS:
      return state.map(function(assignment) {

        if(assignment.context !== 'upcoming') {
          return assignment;
        }

        return assign(
          {},
          assignment,
          {data: action.newAssignments}
        );
      });

    default:
      return previousState;
  }
};
