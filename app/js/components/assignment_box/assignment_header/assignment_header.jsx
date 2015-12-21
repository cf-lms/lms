var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  onClick: function() {
    this.props.onExpandClick(this.props.expand, this.props.context);
  },

  render: function() {
    return (
      <h2 onClick={this.onClick} className="assignment-header">{this.props.header}
        <span className={this.props.expand ? "icon-minus" : "icon-plus"}></span>
      </h2>
    );
  }
});
