var React = require('react');
var ReactDOM = require('react-dom');
var AuthButton = require(__dirname + '/auth_button/auth_button.jsx');

module.exports = React.createClass({

  render: function() {
    return (
      <header>
        <h1>Cadet - Better than Canvas</h1>
        <AuthButton {...this.props} />
      </header>
    );
  }
});
