var types = require(__dirname + '/../constants/action_types');

module.exports.changeViewDashboard = function() {
  return {
    type: types.CHANGE_VIEW_DASHBOARD
  };
};

module.exports.changeViewCourseCreator = function() {
  return {
    type: types.CHANGE_VIEW_COURSE_CREATOR
  };
};
