var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react/lib/ReactTestUtils'),
	expect = require('expect'),
	Landing = require('./../../client/components/Landing.jsx'),
	Login = require('./../../client/components/Login.jsx'),
	AccountHome = require('./../../client/components/AccountHome.jsx'),
	ReactRouter = require('react-router'),
	Router = ReactRouter.Router,
    routes = require('./../../client/routes.jsx');

var renderer = TestUtils.createRenderer();


describe('Landing component', function() {

	// Mock localStorage
	window.localStorage = window.sessionStorage = {
        getItem: function (key) {
            return this[key];
        },
        setItem: function (key, value) {
            this[key] = value;
        }
	};

	var app = TestUtils.renderIntoDocument(<Router>{routes}</Router>);
	
	it('renders Login page if not logged in', function () {
		var landingPage = TestUtils.renderIntoDocument(<Landing />);
		var component = ReactDOM.findDOMNode(landingPage);
		expect(component.children[0].className).toEqual('loginCont');
	})

	it('renders Account Home if logged in', function () {
		var landingPage = TestUtils.renderIntoDocument(<Landing isloggedIn={true}/>);
		var component = ReactDOM.findDOMNode(landingPage);
		expect(component.children[0].className).toEqual('accountHomeCont');
	})

})