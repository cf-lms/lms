var React = require('react');
var ReactDOM = require('react-dom');

var AuthButton = module.exports = React.createClass({

  render: function() {
    return(
      <div className="login">
        <a className="button" onClick={this.props.handleAuthClick} href='https://github.com/login/oauth/authorize?client_id=1fe1ac6261a105f3ee49'>{this.props.loggedInStatus ? "Log Out" : "Log In"}</a>
      </div>
    );
  }
});
