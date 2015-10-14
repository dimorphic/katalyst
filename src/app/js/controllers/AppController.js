define(function(require){
	'use strict';

	var AppController = function AppController($timeout) {
		var vm = this;

		// ---------------
        // PUBLIC METHODS
        // ---------------
		vm.test = 'lolz bro. magic!';

		// ---------------
        // PRIVATE METHODS
        // ---------------
		var _activate = function() {
			console.log('App controller up!');

			$timeout(function() {
				vm.test = 'oh noes. it worked?';
			}, 2000);
		};

		// ...and call it
		_activate();
	};

	// inject modules
	AppController.$inject = ['$timeout'];

	// expose
	return AppController;
});
