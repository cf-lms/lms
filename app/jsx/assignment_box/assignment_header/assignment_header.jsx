var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  onClick: function() {
    this.props.onExpandClick();
  },

  render: function() {
    return (
      <h1 onClick={this.onClick} className="assignment-header">{this.props.header}
        <span className={this.props.expand ? "icon-minus" : "icon-plus"}></span>
      </h1>
    );
  }
});
