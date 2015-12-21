var request = require('superagent');
var Course = require(__dirname + '/../models/course');
var Assignment = require(__dirname + '/../models/assignment');

var host = process.env.HOST || 'https://api.github.com';

function saveCourse(courseData, cb) {
  course = new Course();

  course.name = courseData.name;
  course.description = courseData.description;
  course.save(cb);
};

function saveAssignment(assignmentData, cb) {
  assignment = new Assignment();

  assignment.name = assignmentData.name;
  assignment.type = assignmentData.type;
  assignment.url = assignmentData.url;
  assignment.courseId = assignmentData.courseId;
  assignment.dueDate = assignmentData.dueData;
  assignment.save(cb);
};

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

function flattenNest(input) {
  var output = []
  input.forEach(function(week) {
    week.days.forEach(function(day) {
      day.assignments.forEach(function(assignment) {
        output.push(assignment);
      });
    });
  });
  return output;
};

function createAssignments(req, cb) {
  var count = 0;
  req.send = {assignments: []};
  flattenNest(req.courseData.weeks).forEach(function(assignment) {
    count++;
    request
      .post(host + '/orgs/' + req.courseData.title + '/repos')
      .send({name: assignment.description, description: assignment.type})
      .set('Authorization', 'token ' + req.token)
      .end(function(err, data) {
        if (err) return cb(err);
        data.body.courseId = req.send.course._id;
        saveAssignment(data.body, function(err, assignment) {
          req.send.assignments.push({
            id: assignment._id,
            name: assignment.name,
            url: assignment.url,
            description: assignment.description
          });
        if (req.send.assignments.length === count) cb(err, req.send);
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
          console.log('week created');
        });
      });
      saveCourse(data.body, function(err, course) {
        if (err) console.log(err);
        req.send.course = course;
      });
      createAssignments(req, cb);
    });
}

function getReadme(req, cb) {
  req.user = 'dabellator';
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
  saveCourse: saveCourse,
  saveAssignment: saveAssignment,
  createFile: createFile,
  createWeek: createWeek,
  createAssignments: createAssignments,
  createCourse: createCourse,
  getReadme: getReadme
};

