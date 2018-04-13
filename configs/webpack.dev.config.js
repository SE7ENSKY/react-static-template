const configMerge = require('webpack-merge');
const { join } = require('path');
const {
	HotModuleReplacementPlugin,
	NamedModulesPlugin
} = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const {
	PROJECT_ROOT,
	baseConfig,
	postcssLoaderOptions,
	stylusLoaderOptions
} = require('./webpack.base.config');

const modernizrConfig = {
	'minify': false,
	'options': [
		'setClasses'
	],
	'feature-detects': [
		'touchevents'
	]
};

const devConfig = {
	devtool: 'eval',
	cache: true,
	entry: {
		main: [
			'babel-polyfill',
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
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: postcssLoaderOptions
					},
					{
						loader: 'resolve-url-loader',
						options: { includeRoot: true }
					}
				]
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: postcssLoaderOptions
					},
					{
						loader: 'resolve-url-loader',
						options: { includeRoot: true }
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				]
			},
			{
				test: /\.styl$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: postcssLoaderOptions
					},
					{
						loader: 'resolve-url-loader',
						options: { includeRoot: true }
					},
					{
						loader: 'stylus-loader',
						options: stylusLoaderOptions
					}
				]
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
		new ModernizrWebpackPlugin(modernizrConfig)
	]
};

module.exports = configMerge(baseConfig, devConfig);
