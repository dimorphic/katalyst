// deps
const webpack = require('webpack');

const PATHS = require('./config').paths;

// extend base config
const CONFIG = Object.assign({}, require('./webpack.base'));

// web / dev server settings
const HOST = '0.0.0.0'; // bind on all interfaces (use 'localhost' for privacy)
const PORT = 8080;

//
//	MULTIPLE ENTRY POINTS
//	add webpack hot and dev server paths
//
CONFIG.entry.unshift(
	'webpack/hot/dev-server',
	`webpack-dev-server/client?http://${HOST}:${PORT}`
);

//
//	DEVELOPMENT PLUGINS
//
CONFIG.plugins.push(
	// new webpack.optimize.OccurenceOrderPlugin(), // use only in prod/build ?
	new webpack.HotModuleReplacementPlugin()
	// new webpack.NoErrorsPlugin() // don't emit assets on errors
);

//
//  DEVELOPMENT LOADERS
//
CONFIG.module.loaders.push(
    // CSS / SCSS
    {
        test: /\.(scss|css)$/,
        loaders: [
            'style-loader',
            'css-loader',
            'autoprefixer-loader?browsers=last 2 versions',
            'sass-loader?outputStyle=expanded'
        ]
    }
);

// LINT ?
/*
CONFIG.eslint = {
    // parser: 'babel-eslint',
	configFile: `${PATHS.app}/js/.eslintrc`
    // emitErrors: true
    // failOnError: true
};
*/

//
//	WEB DEV SERVER
//
CONFIG.devServer = {
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
};

// expose
module.exports = CONFIG;
