'use strict';

// KATALYST
var CONFIG = require('../config');

// deps
var gulp = require('gulp');
var runSequence = require('run-sequence');

// JS transformers:
// uglify
var uglify = require('gulp-uglify');

//
//	JS:MOVE task
//
gulp.task('js:move', function(){
	// stream I/O
	var input = CONFIG.paths.js.src;
	var output = CONFIG.paths.js.dest;

	// stream SCSS
	var stream = gulp.src(input)
	.pipe(gulp.dest(output));

	// signal task done
	return stream;
});

//
//	JS:DEV task
//
gulp.task('js:dev', function(cb) {
	runSequence(
		'eslint',
		// 'requirejs',
		'js:move',
	cb);
});
