var path = require('path'); 
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var projectTitle = 'Teachably Admin';

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/index.js'),
		vendors: ['react','redux','react-redux']
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'app.js'
	},
	
	module: {
        loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.woff$/, loader: 'file-loader' },
			{ test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?limit=8192' },
			{ 	test: /\.jsx?$/, 
				loaders: [	
						'react-hot', 
						'babel-loader?optional=runtime&stage=2'
						],
				include: path.join(__dirname, 'src'),
				exclude: [node_modules]
			}
        ]
    },
    
    plugins: [
	    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
	    new HtmlWebpackPlugin({ 
		    hash: true,
		    inject: 'body',
		    minify: true,
		    template: path.join(__dirname, '/src/index-template.html'),
		    title: projectTitle,
		    favicon: path.join(__dirname, './src/img/favicon.png')
	    })
    ]
};