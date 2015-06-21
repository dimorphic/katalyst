'use strict';

// KATALYST
var CONFIG = require('../config');

// deps
var gulp = require('gulp');
var runSequence = require('run-sequence');

// JS transformers:
// babel, uglify
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

//
//	JS:BABEL
//	do any transforms here (es 6-to-5, react, etc)
//
gulp.task('js:babel', function() {
	// stream I/O
	var input = CONFIG.paths.js.src;
	var output = CONFIG.paths.js.temp;

	// stream SCSS
	var stream = gulp.src(input)
	.pipe(babel())
	.pipe(gulp.dest(output));

	// signal task done
	return stream;
});

//
//	JS:MAKE task (aka 'compile')
//
gulp.task('js:copy', function() {
	// stream I/O
	var input = CONFIG.paths.js.temp + '**/*.js';
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
		'js:babel',
		// 'requirejs',
		'js:copy',
	cb);
});
