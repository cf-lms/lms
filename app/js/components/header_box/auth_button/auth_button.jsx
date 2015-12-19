var React = require('react');
var ReactDOM = require('react-dom');

var AuthButton = module.exports = React.createClass({

  handleAuthClick: function() {
    store.dispatch();
  },

  render: function() {
    return(
      <a onClick={this.handleAuthClick} href="#">{this.props.loggedInStatus ? "Log Out" : "Log In"}</a>
    );
  }
});
