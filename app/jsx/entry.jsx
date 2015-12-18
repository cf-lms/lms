var React = require('react');
var ReactDOM = require('react-dom');
require('./sass/application.scss');
var AssignmentBox = require(__dirname + '/assignment_box/assignment_box.jsx');
var HeaderBox = require(__dirname + '/header_box/header_box.jsx');
var AsideBox = require(__dirname + '/aside_box/aside_box.jsx');

ReactDOM.render(
  <HeaderBox />,
  document.getElementById('header')
);

ReactDOM.render(
  <AsideBox />,
  document.getElementById('aside')
);

ReactDOM.render(
  <AssignmentBox expand={true} header='DUE RIGHT FUCKING NOW' />,
  document.getElementById('currentAssignments')
);

ReactDOM.render(
  <AssignmentBox expand={false} header='DUE FUCKING LATER' />,
  document.getElementById('futureAssignments')
);

ReactDOM.render(
  <AssignmentBox expand={false} header='DUE FUCKING LAST WEEK' />,
  document.getElementById('previousAssignments')
);


