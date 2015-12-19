var React = require('react');
var ReactDOM = require('react-dom');
var AssignmentBox = require(__dirname + '/assignment_box/assignment_box.jsx');
var HeaderBox = require(__dirname + '/header_box/header_box.jsx');
var AsideBox = require(__dirname + '/aside_box/aside_box.jsx');

ReactDOM.render(
  <HeaderBox />,
  document.getElementById('header')
);

ReactDOM.render(
  <NavBox />,
  document.getElementById('nav')
);

ReactDOM.render(
  <AssignmentBox expand={true} header='Due Right Fucking Now!' />,
  document.getElementById('currentAssignments')
);

ReactDOM.render(
  <AssignmentBox expand={false} header='Due Fucking Later!' />,
  document.getElementById('futureAssignments')
);

ReactDOM.render(
  <AssignmentBox expand={false} header='Due Fucking Last Wweek!' />,
  document.getElementById('previousAssignments')
);
