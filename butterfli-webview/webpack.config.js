module.exports = {
	entry: './client/main.jsx',
	output: {
		filename: 'bundle.js',
		path: './dest/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-core',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
}