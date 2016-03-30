var React = require('react'),
	TestUtils = require('react/lib/ReactTestUtils'),
	expect = require('expect'),
	Landing = require('./../../client/components/Landing.jsx');


describe('Landing component', function() {
	it('landing renders without problems', function () {
		var landingPage = TestUtils.renderIntoDocument(<Landing />);
		expect(landingPage).toExist();
	})
})