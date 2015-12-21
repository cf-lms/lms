var request = require('superagent');

var host = process.env.HOST || 'https://api.github.com';

function createFile(req, cb) {
  request
    .put(host + '/repos/' + req.courseRepoName + '/contents/' + req.filePath)
    .send({
      'message':'initialize course repo',
      'content':req.fileContent
    })
    .set('Authorization', 'token ' + req.token)
    .set('Content-Type', 'application/json')
    .end(cb);
}

function createWeek(req, cb, count) {
  var count = count || 0;
  req.filePath = req.courseData.weeks[count].order + '/README.md';
  createFile(req, function(err, data) {
    if (err) cb(err);
    count++;
    req.courseData.weeks.length === count ? cb() : createWeek(req, cb, count);    
  });
}

function createAssignments(req, cb) {
  var org = 'javascript-test';
  var count = 0;
  req.send = {assignments: []};
  req.courseData.weeks.forEach(function(week) {
    week.days.forEach(function(day) {
      day.assignments.forEach(function(assignment) {
        count++;
        request
          .post(host + '/orgs/' + org + '/repos')
          .send({name: assignment.type + count, description: assignment.description})
          .set('Authorization', 'token ' + req.token)
          .end(function(err, data) {
            if (err) return cb(err);
            req.send.assignments.push({
              name: data.body.name,
              url: data.body.html_url,
              description: data.body.description
            })
            if (req.send.assignments.length === count) cb(err, req.send);
          });
      });
    });
  });
};

function createCourse(req, cb) {
  request
    .post(host + '/user/repos')
    .send({name: req.courseData.title, description: req.courseData.description})
    .set('Authorization', 'token ' + req.token)
    .end(function(err, data) {
      // return the url to the callback
      req.courseRepoName = data.body.full_name;
      req.filePath = 'README.md';
      createFile(req, function(err, info) {
        if (err) return cb(err);
        createWeek(req, function() {
          console.log('course created');
        });
      });
      createAssignments(req, cb);
    });
}

function getReadme(req, cb) {
  req.user = 'cf-lms';
  req.readme = "example/example.md";
  request
    .get(host + '/repos/' + req.user + '/' + req.body.repo + '/contents/' + req.readme)
    .set('Authorization', 'token ' + req.token)
    .end(function(err, data) {
      if (err) console.log(err);
      var payload = JSON.parse(data.text);
      req.fileContent = payload.content;
      var contents = new Buffer(payload.content, 'base64').toString();
      cb(contents);
    });
}

module.exports = {
  createFile: createFile,
  createWeek: createWeek,
  createAssignments: createAssignments,
  createCourse: createCourse,
  getReadme: getReadme
};

