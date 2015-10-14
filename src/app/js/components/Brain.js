define(function(require){
	'use strict';

	// deps
	var angular = require('angular');

	var BrainController = require('controllers/BrainController');

	// settings
	var MODULE_NAME = 'Brain';

	//
	//	Brain directive
	//
	angular.module(MODULE_NAME, [])
		.directive(MODULE_NAME.toLowerCase(),
			function() {
				var tpl = 'templates/Brain.tpl.html';

				var link = function(scope, element) {
					console.log('Brain link ok!');
				};

				// return directive config
				return {
					restrict: 'E',
					templateUrl: tpl,
					link: link,
					controller: BrainController,
					controllerAs: 'brain'
				};
			}
	);

	return MODULE_NAME;
});
