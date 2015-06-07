'use strict';

// deps
var gutil = require('gulp-util');
var helpers = require('./helpers');

//
//  KATALYST global config
//
var CONFIG = {};

//
//  APP DEPENDENCIES paths (vendor)
//
// ...used for selective copy of files
// to app sources vendor dir
//
CONFIG.deps = {
	css: [
        'node_modules/vex-js/css/vex.css'
    ],

	js: [
        'node_modules/jquery/dist/jquery.js'
	]
};

//
//  APP SOURCES paths
//
CONFIG.paths = {
	// APP base dirs
	app: {
		src: 		'src/',	// app sources dir
	    dest: 		'dist/'	// app build dir
	},

	// CSS
	css: {
		src: 		'src/app/scss/**/*.scss',
		vendor: 	'src/app/scss/vendor/',
		dest: 		'dist/css/'
	},

	// JS
    js: {
        src: 		'src/app/js/**/*.js',
		vendor: 	'src/app/js/vendor/',
        dest: 		'dist/js/'
    },

	// TEMPLATES
	templates: {
		src: 		'src/www/**/*.html',
		dest: 		'dist/'
	},

	// FAVICONS
	favicons: {
		src: 		'src/www/assets/favicons/**/*',
		dest: 		'dist/assets/favicons/'
	},

	// FONTS
	fonts: {
		src: 		'src/www/assets/fonts/**/*',
		dest: 		'dist/assets/fonts/'
	},

	// IMAGES
	images: {
		src: 		'src/www/assets/images/**/*',
		dest: 		'dist/assets/images/'
	},

	// SVG (icons)
	svg: {
		src: 		'src/assets/svg/**/*.svg',
		dest: 		''
	}
};

// expose
module.exports = {
    paths: CONFIG.paths,
    deps: CONFIG.deps
};
