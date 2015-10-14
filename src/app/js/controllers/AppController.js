define(function(require){
	'use strict';

	var AppController = function AppController($timeout) {
		var vm = this;

		vm.test = 'lolz bro. magic!';

		var _activate = function() {
			console.log('App controller up!');

			$timeout(function() {
				vm.test = 'oh noes. it worked?';
			}, 2000);
		};

		// ...and call it
		_activate();
	};

	AppController.$inject = ['$timeout'];

	return AppController;
});
