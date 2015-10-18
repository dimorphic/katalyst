define(function(require){
	'use strict';

	// deps
	var angular = require('angular');

	// settings
	var MODULE_NAME = 'Braincell';

	//
	//	Brain directive
	//
	angular.module(MODULE_NAME, [])
		.directive(MODULE_NAME.toLowerCase(),
			function() {
				// DOM link
				var link = function(scope, element, attrs) {
					// var cell = scope.cell();

					// console.log('Braincell link ok!', cell);

					/*
					scope.$watch(
						function(){
							return scope.query();
						},
						function(newValue, oldValue) {
							console.log('query old: ', oldValue);
							console.log('query new: ', newValue);
							console.log(' ');
						}
					);
					*/

					// attrs.$observe('query', function(oldValue, newValue) {
					// 	console.log('query old:', oldValue);
					// 	console.log('query new:', newValue);
					// 	console.log(' ');
					// });
				};

				// return directive config
				return {
					restrict: 'E',
					templateUrl: `templates/${MODULE_NAME}.tpl.html`,
					link: link,
					scope: {
						// cell: '&',
						// size: '@',
						query: '@'
						// noise: '@',
						// fill: '@'
					}
				};
			}
	);

	return MODULE_NAME;
});
