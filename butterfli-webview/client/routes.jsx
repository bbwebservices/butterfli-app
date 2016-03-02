var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var Butterfli = require('./Butterfli.jsx');
var DashHome = require('./components/DashHome.jsx');
var Landing = require('./components/Landing.jsx');

module.exports = [
	<Router>
		<Route path='/' component={Butterfli}>
			<IndexRoute component={Landing} />
			<Route path='/DashHome' component={DashHome} />
		</Route>
	</Router>
]