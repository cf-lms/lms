require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var Provider = require('react-redux').Provider;
var App = require(__dirname + '/containers/app.jsx');
var thunk = require('redux-thunk');
var rootReducer = require(__dirname + '/reducers/reducers');

var createStoreWithMiddleware = Redux.applyMiddleware(thunk)(Redux.createStore);
var store = createStoreWithMiddleware(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
