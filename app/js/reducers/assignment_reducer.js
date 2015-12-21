var types = require(__dirname + '/../constants/action_types');
var assign = require('object-assign');

var initialState = [
  {
    data: [{_id: 0, name: 'No Assignments'}],
    expand: false,
    header: 'Due Later',
    context: 'upcoming'
  },
  {
    data: [{_id: 0, name: 'No Assignments'}],
    expand: true,
    header: 'Due Right Now',
    context: 'current'
  },
  {
    data: [{_id: 0, name: 'No Assignments'}],
    expand: false,
    header: 'Past Due',
    context: 'late'
  },
  {
    data: [{_id: 0, name: 'No Assignments'}],
    expand: false,
    header: 'Turned In',
    context: 'turnedIn'
  }
];

module.exports = function assignments(state, action) {
  var previousState = (state ? state : initialState);

  switch(action.type) {

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
        if(assignment.context === 'upcoming') {
          return assign(
            {},
            assignment,
            {data: action.upcoming}
          );
        }

        if(assignment.context === 'current') {
          return assign(
            {},
            assignment,
            {data: action.current}
          );
        }

        if(assignment.context === 'late') {
          return assign(
            {},
            assignment,
            {data: action.late}
          );
        }

        if(assignment.context === 'turnedIn') {
          return assign(
            {},
            assignment,
            {data: action.turnedIn}
          );
        }
      });

    case types.UPDATE_ASSIGNMENTS:
      return state.map(function(assignment) {
        if(assignment.context !== action.context && assignment.context !== 'turnedIn') {
          return assignment;
        }

        if(assignment.context === 'turnedIn') {

          for(var i = 0; i < assignment.data.length; i++) {
            if(assignment.data[i]._id === action._id) {
              return assign(
                {},
                assignment
              );

            }
          }

          return assign(
            {},
            assignment,
            {data: assignment.data.concat(action.completedAssignment)}
          );
        }

        for (var i = 0; i < assignment.data.length; i++) {

          if(assignment.data[i]._id === action._id) {
            action.completedAssignment = assignment.data.splice(i, 1);
            action.completedAssignment.turnedIn = action.turnedIn;
            break;
          }
        }
        return assignment;
      });

    default:
      return previousState;
  }
};
