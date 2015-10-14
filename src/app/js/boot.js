define(function(require){
	'use strict';

	// deps
	var angular = require('angular');

	var app = require('app');

	//
	// DOM ready
	//
	angular.element(document).ready(function() {
		console.log('[BOOT]');
		angular.bootstrap(document, ['app']);
	});
});
