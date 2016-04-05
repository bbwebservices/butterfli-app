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
		
		var renderer = TestUtils.createRenderer();
		renderer.render(<Landing updateCreds={undefined}/>)
		var actual = renderer.getRenderOutput();
		var expected = <div><Login updateCreds={undefined} /></div>;
		expect(actual).toEqual(expected);
	
	})

	it('renders Account Home if logged in', function () {
		var renderer = TestUtils.createRenderer();
		renderer.render(<Landing isloggedIn={true} saveCurrentDash={function(){}} dashes={{}} username={'test'}/>)
		var actual = renderer.getRenderOutput();
		var expected = <div><AccountHome saveCurrentDash={undefined} dashes={undefined} username={undefined}/></div>
		expect(actual).toEqual(expected);
	})

})