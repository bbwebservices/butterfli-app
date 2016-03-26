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
			{
				test: /\.js?$/,
				include: /node_modules\/request/,
				loader: StringReplacePlugin.replace({ // from the 'string-replace-webpack-plugin'
			        replacements: [ {
			          pattern: /define\.amd/ig,
			          replacement: function(match, p1, offset, string) {
			            return false;
			          }
			        }]
			    })
			}
		],


	},
	node: {
		console: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	externals: {
		request: false
	}
}

// config.node = {
// 	console: 'empty',
// 	fs: 'empty',
// 	net: 'empty',
// 	tls: 'empty'
// }
module.exports = config;