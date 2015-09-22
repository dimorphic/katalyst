define(function(require){
	'use strict';

	// deps
	var $ = require('jquery');

	// components
	var Brain = require('components/Brain');

	// DOM ready
	$(function() {
		var $bttn = $('#boot');

		// initialize Brain
		var app = new Brain('#app');

		$bttn.on('click', function() {
			app.memory.generateNoise();
		});
	});
});
