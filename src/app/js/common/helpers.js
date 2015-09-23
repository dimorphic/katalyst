define(function(require){
	'use strict';

	//
	// RAF polyfill
	//
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function ( callback ) {
				window.setTimeout( callback, 16.6 ); // up to 60 FPS (1000/60)
			};
	})();

	window.cancelRequestAnimFrame = (function() {
		return window.cancelAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame ||
			window.oCancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame ||
			clearTimeout;
	})();

	//
	// get random color helper
	//
	var _getRandomColor = function() {
		var color = '#' + Math.random().toString(16).substr(2, 6);

		return color;
	};

	//
	// get random char helper
	//
	var _getRandomChar = function() {
		var chars = '<>!"%^&,.?()_=';
		var randomAction = chars[Math.floor(Math.random() * chars.length)];

		return randomAction;
	};

	//
	//	Basic encode of strings into decimal digits
	//
	var zeroPad = function(n, w) {
		while (n.toString().length < w) {
			n = '0' + n;
		}
		return n;
	};

	var toNumbers = function(str) {
		var nums = '';
		for (var i = 0; i < str.length; i++) {
			nums += zeroPad(str.charCodeAt(i), 3);
		}
		return nums;
	};

	var fromNumbers = function(nums) {
		var str = '';
		for (var i = 0; i < nums.length; i += 3){
			// console.log(i + ': ' + nums.substring(i, i + 3));
			str += String.fromCharCode(nums.substring(i, i + 3));
		}
		return str;
	};

	// expose
	return {
		getRandomColor: _getRandomColor,
		getRandomChar: _getRandomChar,
		toNumbers: toNumbers,
		fromNumbers: fromNumbers
	};
});
