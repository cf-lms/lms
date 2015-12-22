require('isomorphic-fetch');
var types = require(__dirname + '/../constants/action_types');

module.exports.initCourse = function(repo, readmePath, startDate, callback, secondCallback, changeView) {
  var request = new Request('git/create/course', {
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    credentials: 'same-origin',
    body: JSON.stringify({
      repo: repo,
      readme: readmePath,
      startDate: startDate
    })
  });

  return function(dispatch) {
    return fetch(request)
      .then(function(res) {
        if (res.status >= 200 && res.status < 300) {
          console.log('Successfully created course');
          return res.json();
        }
        else {
          throw error;
        }
      })
      .then(function(data) {
        return callback(data.assignments, secondCallback);
      })
      .then(function() {
        dispatch(changeView());
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
