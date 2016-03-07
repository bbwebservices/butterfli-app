var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var browserHistory = require('react-router').browserHistory;
var createBrowserHistory = require('react-router').createBrowserHistory;

var Butterfli = require('./Butterfli.jsx');
var DashHome = require('./components/DashHome.jsx');
var Landing = require('./components/Landing.jsx');
var ScrapeHome = require('./components/ScrapeHome.jsx');
var SignUp = require('./components/SignUp.jsx');
var EditDash = require('./components/EditDash.jsx');




module.exports = [
	<Router history={createBrowserHistory}>
		<Route path='/' component={Butterfli}>
			<IndexRoute component={Landing} />
			<Route path='/signup' component={SignUp} />
			<Route path='/dashhome' component={DashHome} />
			<Route path='/scrapehome' component={ScrapeHome} />
			<Route path='/editdash' component={EditDash} />
		</Route>
	</Router>
]