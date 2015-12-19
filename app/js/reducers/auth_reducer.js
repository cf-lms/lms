var types = require(__dirname + '/../constants/action_types');

var initialState = {
  user: '',
  loggedInStatus: false,
};

module.exports = function authentication(state, action) {
  var previousState = (state ? state : initialState);

  switch(action.type) {
    case types.USER_SIGNUP:
      return [{
        username: ''
      }].concat(previousState);

    case types.LOGGED_IN_STATUS:
      return [{
        loggedInStatus: action.status
      }].concat(previousState);

    case types.HANDLE_AUTH_CLICK:
      return [{
        handleAuthClick: action.data
      }].concat(previousState);

    default:
      return previousState;
  }
};
