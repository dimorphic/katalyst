define(function(require){
	'use strict';

	// deps
	var $ = require('jquery');
	var angular = require('angular');

	var app = require('app');

	//
	// DOM ready
	//
	angular.element(document).ready(function() {
		console.log('[BOOT]');
		// var root = angular.element(document.getElementById('app'));
		// root.attr('ng-controller', 'AppController as app');
		angular.bootstrap(document, ['app']);
	});
});
