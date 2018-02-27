const configMerge = require('webpack-merge');
const { join } = require('path');
const {
	HotModuleReplacementPlugin,
	NamedModulesPlugin
} = require('webpack');
const HappyPack = require('happypack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const {
	PROJECT_ROOT,
	baseConfig,
	happyThreadPool,
	postcssLoaderOptions,
	stylusLoaderOptions
} = require('./webpack.base.config');

const devConfig = {
	devtool: 'eval',
	cache: true,
	entry: {
		main: [
			'event-source-polyfill',
			'webpack-hot-middleware/client',
			join(PROJECT_ROOT, 'src', 'main.js')
		]
	},
	output: {
		publicPath: '/',
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: 'happypack/loader?id=css'
			},
			{
				test: /\.(sass|scss)$/,
				use: 'happypack/loader?id=sass'
			},
			{
				test: /\.styl$/,
				use: 'happypack/loader?id=styl'
			}
		]
	},
	plugins: [
		new HotModuleReplacementPlugin(),
		new NamedModulesPlugin(),
		new CircularDependencyPlugin({
			exclude: /node_modules/,
			failOnError: true
		}),
		new HappyPack({
			id: 'css',
			verbose: false,
			threadPool: happyThreadPool,
			loaders: [
				'style-loader',
				'css-loader',
				{
					path: 'postcss-loader',
					query: postcssLoaderOptions
				},
				{
					path: 'resolve-url-loader',
					query: { includeRoot: true }
				}
			]
		}),
		new HappyPack({
			id: 'sass',
			verbose: false,
			threadPool: happyThreadPool,
			loaders: [
				'style-loader',
				'css-loader',
				{
					path: 'postcss-loader',
					query: postcssLoaderOptions
				},
				{
					path: 'resolve-url-loader',
					query: { includeRoot: true }
				},
				{
					path: 'sass-loader',
					query: { sourceMap: true }
				}
			]
		}),
		new HappyPack({
			id: 'styl',
			verbose: false,
			threadPool: happyThreadPool,
			loaders: [
				'style-loader',
				'css-loader',
				{
					path: 'postcss-loader',
					query: postcssLoaderOptions
				},
				{
					path: 'resolve-url-loader',
					query: { includeRoot: true }
				},
				{
					path: 'stylus-loader',
					query: stylusLoaderOptions
				}
			]
		})
	]
};

module.exports = configMerge(baseConfig, devConfig);
