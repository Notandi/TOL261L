var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../components/Main');
var Home = require("../components/Home");
var MusicContainer = require('../containers/MusicContainer');
var SelectorContainer = require('../containers/SelectorContainer');



var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='playMusic' component={MusicContainer} />
      <Route path='selector' component={SelectorContainer} />
    </Route>
  </Router>
);

module.exports = routes;
