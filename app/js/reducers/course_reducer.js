var types = require(__dirname + '/../constants/action_types');

var initialState  = [{

}];

module.exports = function authentication(state, action) {
  var previousState = (state ? state : initialState);

  switch(action.type) {

    default:
      return previousState;
  }
};
