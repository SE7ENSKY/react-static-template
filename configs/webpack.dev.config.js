const { SOURCEMAP } = process.env;

const configMerge = require('webpack-merge');
const { join } = require('path');
const {
	HotModuleReplacementPlugin,
	NamedModulesPlugin
} = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');
const modernizrConfig = require('./modernizr.config.js');
const stylusLoaderConfig = require('./stylus.loader.config.js');
const postcssLoaderConfig = require('./postcss.loader.config.js');
const sassResourcesLoaderConfig = require('./sass.resources.loader.config');
const PROJECT_ROOT = require('./project.root.js');


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
						options: postcssLoaderConfig
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
						options: postcssLoaderConfig
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: !!SOURCEMAP }
					},
					{
						loader: 'sass-resources-loader',
						options: sassResourcesLoaderConfig
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
						options: postcssLoaderConfig
					},
					{
						loader: 'stylus-loader',
						options: stylusLoaderConfig
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
