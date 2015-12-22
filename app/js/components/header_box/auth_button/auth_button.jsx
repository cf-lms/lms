var React = require('react');
var ReactDOM = require('react-dom');

var AuthButton = module.exports = React.createClass({

  onClick: function() {
    this.props.changeLoggedInStatus(this.props.loggedInStatus);
  },

  render: function() {
    return(
      <div className="login">
        {this.props.loggedInStatus ? null :
          <a className="button" onClick={this.onClick} href='https://github.com/login/oauth/authorize?client_id=1fe1ac6261a105f3ee49'>Login</a>
        }
      </div>
    );
  }
});
