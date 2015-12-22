var types = require(__dirname + '/../constants/action_types');
var assign = require('object-assign');

var initialState = [{
  user: document.cookie,
  loggedInStatus: false,
  path: window.location.search
}];

module.exports = function authentication(state, action) {
  var previousState = (state ? state : initialState);

  switch(action.type) {
    case types.USER_SIGNUP:
      return [{
        username: ''
      }].concat(previousState);

    case types.CHANGE_LOGGED_IN_STATUS:
    debugger;
      return [assign(
        {},
        state,
        {loggedInStatus: action.loggedInStatus}
      )].concat(previousState);

    case types.HANDLE_AUTH_CLICK:
      return [{
        handleAuthClick: action.data
      }].concat(previousState);

    case types.GET_TOKEN:
      return [{
        user: action.data
      }].concat(previousState);

    default:
      return previousState;
  }
};
