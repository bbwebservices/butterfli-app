var StringReplacePlugin = require("string-replace-webpack-plugin");

var config = {
	entry: './client/main.jsx',
	output: {
		filename: 'bundle.js',
		path: './dest/'
	},
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
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
}

module.exports = config;