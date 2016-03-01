// deps
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = require('./config').paths;

// extend base config
const CONFIG = Object.assign({}, require('./webpack.base'));

// app chunk files bundles
const BUNDLES = {
	js: '[name].[hash].js',
	css: '[name].[hash].css',
	img: '[path][name].[hash].[ext]'
};

//
//	PRODUCTION PLUGINS
//
CONFIG.plugins.push(
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			// @DEBUG: warn dangerous optimizations / code
			warnings: false,

			screw_ie8: true
		},
		output: {
			comments: false
		}
	}),
	new webpack.optimize.AggressiveMergingPlugin(),

    // copy HTML entry point
    new CopyWebpackPlugin([
        { from: `${PATHS.public}/index.html` },
    ])
);

//
//  PRODUCTION LOADERS
//
CONFIG.module.loaders.push(
  // CSS / SCSS
  {
    test: /\.(scss|css)$/,
    loader: ExtractTextPlugin.extract(
      'style-loader',
      'css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader?outputStyle=expanded')
  }
);

// expose
module.exports = CONFIG;
