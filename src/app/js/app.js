define(function(require){
	'use strict';

	// deps
	var $ = require('jquery');
	var React = require('react');

	// components
	var Brain = require('components/Brain');

	// DOM ready
	$(function() {

		console.log('test bro!');

		React.render(<Brain />, document.getElementById('app'));
	});
});
