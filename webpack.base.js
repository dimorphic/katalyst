// require("babel-core/register");

// deps
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// ENV
const ENV = process.env.NODE_ENV || 'development';

// app paths
const PATHS = require('./config').paths;

// app chunk files bundles
const BUNDLES = {
	js: '[name].js',
	css: '[name].css',
	img: '[path][name].[ext]'
};

//
//	DEFAULT PLUGINS
//
const PLUGINS = [
	new webpack.DefinePlugin({
		'__DEV__': JSON.stringify(ENV === 'development' || false),
		'process.env': { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV) }
	}),
	new ExtractTextPlugin(BUNDLES.css)
];

//
//	DEFAULT LOADERS
//
const LOADERS = [
	// CSS / SCSS
	{
		test: /\.(scss|css)$/,
		loaders: [
			'style-loader',
			'css-loader',
			'autoprefixer-loader?browsers=last 2 versions',
			'sass-loader?outputStyle=expanded'
		],
		include: `${PATHS.app}/scss`,
		// @TODO: add node_modules / bower_components CSS imports ?
	},

	// JS + ES6
	{
		test: /\.js$|.jsx$/,
		loader: 'babel',
		query: {
            cacheDirectory: true,
			presets: ['es2015', 'stage-2']
		},
		include: `${PATHS.app}/js`,
		exclude: [
			path.join( __dirname, 'node_modules' ),
			path.join( __dirname, 'bower_components' )
		]
	},

	// HTML
	{
		test: /\.html$/,
		loaders: ['html']
	},

	// IMAGES / SVG
	{
    	test: /.*\.(gif|png|jpe?g|svg)$/i,
    	loaders: [
      		`file?hash=sha512&digest=hex&name=${BUNDLES.img}`,
      		'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
    	]
  	}
];

//
//  DEFAULT PRELOADERS
//
const PRELOADERS = [
    {
		test: /\.js$|.jsx$/,
		loader: 'eslint'
    }
];

//
//	DEFAULT / BASE CONFIG
//
const CONFIG = {
	context: PATHS.app,

	entry: [
		`${PATHS.app}/js/main.js`
		// vendors paths?
	],

	output: {
		path: `${PATHS.build}`,
		filename: BUNDLES.js,
		publicPath: '/'
	},

	// misc
	cache: (ENV === 'development'),
	debug: (ENV === 'development'),
	devtool: (ENV === 'development') ? 'eval' : '',

	// plugins & loaders
	plugins: PLUGINS,
	module: {
        preLoaders: PRELOADERS,
		loaders: LOADERS
	},

    eslint: {
    	configFile: `${PATHS.app}/js/.eslintrc`
        // emitErrors: true
        // failOnError: true
    },

	resolve: {
		root: [ PATHS.app ],
		extensions: [
			'',
			'.js',
			'.jsx',
			'.css',
			'.scss',
		]
		/*
		modulesDirectories: [
			`${PATHS.app}/assets`, // static assets
			`${PATHS.app}/scss`,
			// `${PATHS.app}/vendor`, // bower alias ?

			// fallbacks
			'node_modules'
			// 'bower_components'
		]
		*/
	}
};

// expose
module.exports = CONFIG;
