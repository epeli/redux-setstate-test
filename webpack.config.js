/* by using "path" rather than hard-coding paths (e.g. __dirname + 'node_modules'), your webpack projects becomes more 
  platform-agnostic, as path will figure out what system you're on (e.g. Unix will be /, Windows will be \, etc)
*/
var path = require('path'); 
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');  // set path here, refer to it multiple places below
var HtmlWebpackPlugin = require('html-webpack-plugin'); // generates index.html file on the fly. Why is this not part of core Webpack?

var projectTitle = 'Teachably Admin'; // custom variable that gets used in index-template.html, below


module.exports = {
	
	devtool: 'eval', //various options to help with debugging during development. Source mapping is an option here, but it hasn't been explored yet.
	
	/* "entry" tells webpack where to start the app. The simplest "entry" declaration has a relative path to a JS file. (e.g. "./src/index.js"). 
		You can also specify multiple entry points (e.g. if there are two distinct parts of your app, like front-end and admin). We are not doing
		that currently. However, the below configuration is intended to output all our unique code into "app.js", (named in the "output" section),
		and all of the vendor code into a "vendors.js" file (specified here, and named in the "plugins" section)	
	*/
	entry: {
		app: [
			'webpack-dev-server/client?http://localhost:3000', //gets the webpack-dev-server going
			'webpack/hot/only-dev-server', // gets the webpack-dev-server hot reloader going (also needs HotModuleReplacementPlugin(), below
			path.join(__dirname, 'src/index.js') //should be the entry point for the actual app we're building		
		],
		vendors: ['react','redux','react-redux'] //specifying vendors here will create a "vendors.js" file (see below)
	},
	
	output: {
		path: path.join(__dirname, 'devbuild'), // where will webpack build both in-memory and to-disk builds?
		filename: 'app.js' //what's the name you want the compiled js file to have (needs to match reference in index-template.html)
		//, publicPath: '/static/'  We don't seem to need this now, which is good, since it was totally confusing (let's hope it stays that way)
	},
	
	module: {
       
		// These will be loaded before "loaders", and so it's a safer place to put things like validation (just in case your validation winds up attempting to validate 3rd party module code, etc.)
	    preLoaders: [
			// Code validator
			/* ESLint is mean.  Probably in a good way, but by default it is so ruthless that it makes it difficult to write actual code. So, for now,
				this code validator is commented out. (You can skip the rest of this comment if you're in a hurry). ESLint uses a config file, called
				.eslintrc, that is created at the same directory level as NPM's package.json file. Because it's a hidden file, you might not know it's there. (-;
				Anyway, the .eslintrc file we have is from airbnb, and it's exhaustive. At some point, we will want to go through the file and tweak it
				to conform to the practices we want to follow.  But for now, skip it.
				
			 */
			//{ test: /\.js$/, loader: "eslint-loader", exclude: [node_modules] }
	    ],
       
        loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader' }, //needed to inline styles and css into the [output.filename] bundled file
			{ test: /\.woff$/, loader: 'file-loader' }, // file loader will dump the file into output folder. url-loader works similarly, but can inline files into the outputted [bundle.js] file
				// note: we could inline the .woff file, but at least for now, we'll keep them separate to help illustrate how webpack works
			{ test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?limit=8192' }, // need to inline and/or reference images into the [output.filename] bundled file
			
			// do JS/JSX transformations
			{ 	test: /\.jsx?$/, 
				loaders: [	
						// loaders are invoked bottom-to-top, and order CAN matter (again, yay).
						
						// allows React to reload just part of a page when code changes are made, rather than the whole page/app
						'react-hot', 
						
						// ES6/7 transpiler. Options here: http://babeljs.io/docs/usage/options/
						'babel-loader?optional=runtime&stage=2'
						],
				include: path.join(__dirname, 'src'), //include these dirs for transformation 
				exclude: [node_modules] // exclude these directories from babel transformations (unclear if you need include AND exclude)
			}
        ]
    },
    
    
    // list of all plugins: http://webpack.github.io/docs/list-of-plugins.html
    plugins: [
	    new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}), // creates a single JS file for all vendor files (specified above)
	    
	    // student login
	    new HtmlWebpackPlugin({ // this builds the index file for both dev and build versions (so we don't actually need one)
		    hash: true, // can be useful for cache busting
		    inject: "body", //inject all scripts into body
		    minify: true, //supposedly minifys the created HTML file, though I see no actual evidence of that
		    template: "./src/index-template.html", //location of template to use in order to create file
		    favicon: path.join(__dirname, './src/img/favicon.png'), //creates a favicon img reference in the file (really, this needs to be more generalized)
		    title: projectTitle		    
	    }),

	    new webpack.HotModuleReplacementPlugin() //allow for hot reloader action (also needs the "entry" call, above)
	    //new webpack.NoErrorsPlugin() // if errors are found during build process, error-riddled files are not written to disk
    ]
    
    /* removing this for now
	resolve: { //allows us to just say "bundle" rather than "bundle.js". unclear how good of an idea this is, especially if you have something like "index.js" and "index.css", etc
		extensions: ['', '.js', '.jsx']
	}
	*/
  
};
