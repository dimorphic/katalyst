define(function(require){
	'use strict';

	// deps
	var $ = require('jquery');
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
					var cell = scope.cell;

					// cache cell element
					var $cell = angular.element(element.find('.Braincell'));

					// get style helper
					var getStyle = function() {
						var style = {
							width: cell.size,
							height: cell.size,
							fontSize: (cell.size * 0.5),

							color: cell.fill.textColor,
							backgroundColor: cell.fill.bgColor || ''
						};

						return style;
					};

					// note: angular.element.css() missbehaves
					// need jquery to overload .css() method
					$cell.css(getStyle());

					scope.$watch('cell.query',
						function(newValue, oldValue) {
							if (newValue !== oldValue) {
								$cell.css(getStyle());
								// console.log('query old: ', oldValue);
								// console.log('query new: ', newValue, cell.id);
								// console.log(' ');
							}
						}
					);
				};

				// return directive config
				return {
					restrict: 'E',
					templateUrl: `templates/${MODULE_NAME}.tpl.html`,
					link: link,
					scope: true
				};
			}
	);

	return MODULE_NAME;
});
