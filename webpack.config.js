'use strict';

// KATALYST
// var CONFIG = require('../config');

// deps
const path = require('path');
const webpack = require('webpack');

// settings
const HOST = 'localhost';
const PORT = 9090;

// get env
const ENV = process.env.NODE_ENV || 'development';

const ENV_CONFIG = {
	development: {
		js: '[name].js',
		css: '[name].css',
		img: '[path][name].[ext]'
	},

	production: {
		js: '[name]-[hash].js',
		css: '[name]-[hash].css',
		img: '[path][name]-[hash].[ext]'
	}
};

// get config based on ENV
const CONFIG = ENV_CONFIG[ENV];

// paths
const PATHS = {
	app: path.join( __dirname, 'src/app' ),
	public: path.join( __dirname, 'src/www' ),
	build: path.join( __dirname, 'dist' )
};

// webpack plugins
const PLUGINS = [
	new webpack.DefinePlugin({
		'__DEV__': JSON.stringify(ENV === 'development' || false),
		'process.env': { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV) }
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin() // don't emit assets on errors
];

// code transform loaders (@TODO: move to own config file?)
const LOADERS = [
	// ES6 transformer
	{
		test: /\.js$|.jsx$/,
		loaders: ['babel?presets[]=es2015'],
		include: `${PATHS.app}/js/`,
		exclude: [
			path.join( __dirname, 'node_modules' ),
			path.join( __dirname, 'bower_components' )
		]
	}
];

// module
module.exports = {
	context: PATHS.app,

	entry: [
		'webpack/hot/dev-server',
		`webpack-dev-server/client?http://${HOST}:${PORT}`,
		`${PATHS.app}/js/main.js`
	],

	output: {
		path: `${PATHS.build}/dev`,
		publicPath: '/',
		filename: CONFIG.js
	},

	// misc
	cache: (ENV === 'development'),
	debug: (ENV === 'development'),
	devtool: (ENV === 'development') ? 'eval' : '',

	// plugins & loaders
	plugins: PLUGINS,
	module: { loaders: LOADERS	},

	resolve: {
		root: [ PATHS.app ],
		extensions: [
			'',
			'.js',
			'.jsx',
			'.css',
			'.scss',
		]
	},

	// DEV server (@TODO: move to own module?)
	devServer: {
		host: HOST,
		port: PORT,

		contentBase: PATHS.public,

		hot: true,
		inline: true,
		progress: true,

		historyApIFallback: true,

		stats: {
			colors: true,
			version: false,
			timings: true
		}
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
