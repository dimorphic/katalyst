define(function(require){
	'use strict';

	// deps
	var $ = require('jquery');
	var helpers = require('common/helpers');

	require('annyang');

	// components
	var Brain = require('components/Brain');
	var Ear = window.annyang;
	var app = null;

	// VOICE COMMANDS
	var COMMANDS = {
		'hello *term': function(term) {
			var translated = helpers.toNumbers(term);

			// strip leading zeros
			while ((parseInt(translated.charAt(0), 10) === 0)) {
				translated = translated.slice(1);
			}

			// make the brain think about the translated msg
			app.think(translated);
		}
	};

	Ear.addCommands(COMMANDS);

	// #debug
	Ear.addCallback('resultMatch', function(userSaid, cmdText, phrases) {
		console.log('user said:', userSaid, '(', cmdText, ')');
		console.log('phrases:', phrases);
		console.log(' ');
	});

	// DOM ready
	$(function() {
		var $bttn = $('#boot');

		// initialize Brain
		app = new Brain('#app');

		$bttn.on('click', function() {
			// app.render();
			// app.think(68097118101);
			// #debug: init Ear
			Ear.start({ autoRestart: false, continuous: true });
		});
	});
});
