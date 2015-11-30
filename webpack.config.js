'use strict';

// KATALYST
// var CONFIG = require('../config');

// deps
var path = require('path');
var webpack = require('webpack');

// get environment
var ENV = process.env.NODE_ENV || 'development';

// paths
var PATHS = {
	src: path.join(__dirname, '/src/app'),
	build: path.join(__dirname, '/dist')
};

// module
module.exports = {
	context: PATHS.src,

	entry: {
		app: 'main.js'
	},

	output: {
		path: PATHS.build,
		publicPath: '/assets/',
		filename: 'bundle.js'
	}
};

//
/*
{
	context: __dirname + "/app",
	entry: "./entry",
	output: {
	    path: __dirname + "/dist",
	    filename: "bundle.js"
	}
}
*/
