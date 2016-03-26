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
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
}