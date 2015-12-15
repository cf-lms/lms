var React = require('react');
var ReactDOM = require('react-dom');
var AssignmentBox = require(__dirname + '/assignment_box/assignment_box.jsx');

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


