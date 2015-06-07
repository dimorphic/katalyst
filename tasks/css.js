'use strict';

// KATALYST
var CONFIG = require('../config');

// deps
var gulp = require('gulp');
var helpers = require('../helpers');
var browserSync = require('browser-sync');

// CSS transformers:
// sass, autoprefixer, minifyCSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

//
//	SASS COMPILE task
//
gulp.task('sass', function(cb) {
	// stream I/O
	var input = CONFIG.paths.css.src;
	var output = CONFIG.paths.css.dest;

	// stream SCSS
	var stream = gulp.src(input)
	.pipe(sass().on('error', function(err){
		helpers.onSassError(err, cb);
	}))
	.pipe(gulp.dest(output));

	// signal task done
	return stream;
});

//
//	CSS - DEV mode build
//
gulp.task('css:dev', ['sass'], function() {
	// stream I/O
	var input = CONFIG.paths.css.dest + '**/*.css';
	var output = CONFIG.paths.css.dest;

	// stream CSS
	var stream = gulp.src(input)
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest(output))
	.pipe(browserSync.stream({ match: '**/*.css' }));

	// signal task done
	return stream;
});

//
//	CSS - PRODUCTION mode build
//
gulp.task('css:prod', ['sass'], function() {
	// stream I/O
	var input = CONFIG.paths.css.dest + '**/*.css';
	var output = CONFIG.paths.css.dest;

	// stream CSS
	var stream = gulp.src(input)
	.pipe($.autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe($.minifyCSS({
		keepSpecialComments: 0
	}))
	.pipe(gulp.dest(output));

	// signal task done
	return stream;
});
