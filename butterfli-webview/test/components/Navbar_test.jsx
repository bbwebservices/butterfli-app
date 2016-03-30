var React = require('react'),
	TestUtils = require('react/lib/ReactTestUtils'),
	expect = require('expect'),
	Navbar = require('./../../client/components/Navbar.jsx');


describe('Navbar component', function() {
	it('renders without problems', function () {
		var nav = TestUtils.renderIntoDocument(<Navbar />);
		expect(nav).toExist();
	})
})
