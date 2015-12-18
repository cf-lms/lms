var types = require(__dirname + '/../constants/action_types');

var initialState = [{
  user: ''
}];

module.exports = function authentication(state, action) {
  var previousState = (state ? state : initialState);

  switch(action.type) {
    case types.USER_SIGNUP:
      return [{
        username: ''
      }].concat(previousState);

    default:
      return previousState;
  }
};
