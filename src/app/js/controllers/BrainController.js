define(function(require){
	'use strict';

	var BrainController = function BrainController($interval) {
		var vm = this;

		// ---------------
        // PUBLIC METHODS
        // ---------------
		vm.redrawCounter = 0;

		// ---------------
        // PRIVATE METHODS
        // ---------------
		var _activate = function() {
			console.log('Brain controller up!');

			$interval(function() {
				++vm.redrawCounter;
			}, 500);
		};

		// ...and call it
		_activate();
	};

	// inject modules
	BrainController.$inject = ['$interval'];

	// expose
	return BrainController;
});
