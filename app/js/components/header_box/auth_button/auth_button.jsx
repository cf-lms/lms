var React = require('react');
var ReactDOM = require('react-dom');

var AuthButton = module.exports = React.createClass({

  render: function() {
    return(
      <a onClick={this.props.handleAuthClick} href="#">{this.props.logStatus}</a>
    );
  }
});
