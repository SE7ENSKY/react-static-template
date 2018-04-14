const {
	// NODE_ENV,
	SOURCEMAP,
	BEAUTIFY,
	TIMESTAMP
} = process.env;

const configMerge = require('webpack-merge');
const { join } = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const StylesPostprocessorPlugin = require('styles-postprocessor-plugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
// const OfflinePlugin = require('offline-plugin');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const stylesPostprocessorConfig = require('./styles.postprocessor.config');
const webpackStats = require('./webpack.stats');
const stylusLoaderConfig = require('./stylus.loader.config.js');
const postcssLoaderConfig = require('./postcss.loader.config.js');
const PROJECT_ROOT = require('./project.root.js');


const prodConfig = {
	entry: {
		main: [
			'babel-polyfill',
			join(PROJECT_ROOT, 'src', 'main.js')
		]
	},
	output: {
		publicPath: '/',
		filename: `assets/[name]${BEAUTIFY ? '' : '.min'}.[chunkhash:8].js`,
		chunkFilename: `assets/[name].chunk${BEAUTIFY ? '' : '.min'}.[chunkhash:8].js`
	},
	watch: false,
	devtool: SOURCEMAP ? 'source-map' : false,
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [
						'css-loader',
						{
							loader: 'postcss-loader',
							options: postcssLoaderConfig
						}
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(sass|scss)$/,
				use: ExtractTextPlugin.extract({
					use: [
						'css-loader',
						{
							loader: 'postcss-loader',
							options: postcssLoaderConfig
						},
						{
							loader: 'sass-loader',
							options: { sourceMap: !!SOURCEMAP }
						}
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.styl$/,
				use: ExtractTextPlugin.extract({
					use: [
						'css-loader',
						{
							loader: 'postcss-loader',
							options: postcssLoaderConfig
						},
						{
							loader: 'stylus-loader',
							options: stylusLoaderConfig
						}
					],
					fallback: 'style-loader'
				})
			}
		]
	},
	plugins: [
		// new ScriptExtHtmlWebpackPlugin({
		// 	defaultAttribute: 'defer'
		// }),
		new ExtractTextPlugin({
			filename: `assets/[name]${BEAUTIFY ? '' : '.min'}.[chunkhash:8].css`,
			allChunks: true
		}),
		new StylesPostprocessorPlugin(stylesPostprocessorConfig)
	]
};

if (!BEAUTIFY) {
	prodConfig.plugins.push(new UglifyJsPlugin({
		sourceMap: !!SOURCEMAP,
		cache: false,
		parallel: true,
		uglifyOptions: {
			ie8: false,
			ecma: 8,
			output: {
				comments: (node, comment) => comment.value === '!\n * \n * @version: 1.0.0\n * \n * @author: SE7ENSKY Frontend studio <info@se7ensky.com>\n * \n '
			}
		}
	}));
}

// if (!TIMESTAMP) {
// 	prodConfig.plugins.push(new ProgressBarPlugin({
// 		width: 40,
// 		summary: false
// 	}));
// }

if (TIMESTAMP) {
	prodConfig.stats = webpackStats;
}

if (SOURCEMAP) {
	prodConfig.plugins.push(new Visualizer({
		filename: './bundle-statistics.html'
	}));
}

// if (NODE_ENV === 'production') {
// 	prodConfig.plugins.push(new OfflinePlugin({
// 		caches: {
// 			main: [
// 				'**/main.*.css',
// 				'**/main.*.js'
// 			],
// 			additional: [
// 				'**/*.*'
// 			]
// 		},
// 		excludes: [
// 			'**/*.map',
// 			'**/bundle-statistics.html'
// 		],
// 		safeToUseOptionalCaches: true,
// 		ServiceWorker: {
// 			navigateFallbackURL: '/',
// 			events: true,
// 			minify: true
// 		},
// 		AppCache: false
// 	}));
// }

module.exports = configMerge(baseConfig, prodConfig);
