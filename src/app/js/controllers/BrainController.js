define(function(require){
	'use strict';

	// models
	var Memory = require('models/Memory');

	// animation options
	var ANIMATION = {
		// play with this!
		alive: 1, // brain is 'alive' (randomize memory activity) ?
		updateMode: 0,		// 0 - full memory
							// 1 - single memory

		// animation settings
		useRAF: true,		// steroids mode on?
		updateDelay: 1000,	// ignored if RAF true, slowpoke

		// trackers
		updateTimer: null	// update timer (raf / interval)
	};

	//
	//	Brain component
	//
	var BrainController = function BrainController($scope, $timeout) {
		var vm = this;

		// ---------------
        // PUBLIC METHODS
        // ---------------
		vm.redrawCounter = 0;
		vm.memory = [];

		// ---------------
        // PRIVATE METHODS
        // ---------------

		var memory = null;

		var _activate = function() {
			// create new memory
			memory = new Memory({
				updateMode: ANIMATION.updateMode
			});

			$timeout(function() {
				vm.memory = memory;

				console.log('cells: ', vm.memory);
			});
		};

		// ...and call it
		_activate();
	};

	// inject modules
	BrainController.$inject = ['$scope', '$timeout'];

	// expose
	return BrainController;
});
