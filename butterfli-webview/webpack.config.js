var webpack = require('webpack');

var PROD = JSON.parse(process.env.PROD_ENV || '0');

var config = {
	entry: './client/main.jsx',
	output: {
		filename: PROD ? 'bundle.min.js' : 'bundle.js',
		path: './dest/'
	},
	// loaders: ['hot-loader'],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{ 
				test:  /\.json$/, 
				loader: 'json-loader' 
			},
		],
	},
	plugins: PROD ? [
		new webpack.optimize.UglifyJsPlugin({minimize: true})
	] : [],
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	watch: true
}

module.exports = config;