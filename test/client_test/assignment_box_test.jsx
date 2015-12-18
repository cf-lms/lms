jest.dontMock('../../app/js/components/assignment_box/assignment_box.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var AssignmentBox = require('../../app/js/components/assignment_box/assignment_box.jsx');

describe('AssignmentBox', function() {

  it('should change the boolen value of expand on a click', function() {

    var Box = TestUtils.renderIntoDocument(
      <AssignmentBox expand={true} />
    );

    expect(Box.state.expand).toEqual(true);

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(Box, 'assignment-header')
    );

    expect(Box.state.expand).toEqual(false);
  });
});
