var types = require(__dirname + '/../constants/action_types');

var initialState  = [{
  currentView: 'dashboard'
}];

module.exports = function changeView(state, action) {
  var previousState = (state ? state : initialState);

  switch (action.type) {
    case types.CHANGE_VIEW_DASHBOARD:
      return [{
        currentView: 'dashboard'
      }].concat(previousState);

    case types.CHANGE_VIEW_COURSE_CREATOR:
      return [{
        currentView: 'course-creator'
      }].concat(previousState);

    default:
      return previousState;
  }
};
