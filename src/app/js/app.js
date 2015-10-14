define(function(require){
	'use strict';

	// deps
	var angular = require('angular');

	// components
	var COMPONENTS = [
		require('components/Brain')
	];

	// define app main module
	var app = angular.module('app', COMPONENTS);
	app.controller('AppController', require('controllers/AppController'));
});
