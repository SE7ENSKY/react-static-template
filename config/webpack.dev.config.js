const merge = require('webpack-merge');
const { join } = require('path');
const nib = require('nib');
const {
	HotModuleReplacementPlugin,
	NamedModulesPlugin
} = require('webpack');
const {
	PROJECT_ROOT,
	baseConfig,
	supportedBrowserslist,
	postcssLoaderOptions,
	getModifiedNib
} = require('./webpack.base.config');


const devConfig = {
	devtool: 'cheap-module-eval-source-map',
	entry: {
		main: [
			'react-hot-loader/patch',
			'webpack-hot-middleware/client',
			'webpack/hot/dev-server',
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
						options: {
							includeRoot: true
						}
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
						options: {
							includeRoot: true
						}
					},
					{
						loader: 'stylus-loader',
						options: {
							sourceMap: true,
							use: nib(),
							import: [
								join(PROJECT_ROOT, 'src', 'styles', 'variables.styl'),
								join(PROJECT_ROOT, 'src', 'styles', 'mixins.styl'),
								getModifiedNib(require.resolve('verstat-nib'))
							],
							preferPathResolver: 'webpack'
						}
					}
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							babelrc: false,
							plugins: [
								'react-hot-loader/babel',
								'transform-runtime',
								'transform-object-rest-spread'
							],
							presets: [
								'react',
								[
									'env',
									{
										targets: {
											browsers: supportedBrowserslist
										},
										modules: false
									}
								]
							]
						}
					}
				]
			}
		]
	},
	plugins: [
		new HotModuleReplacementPlugin(),
		new NamedModulesPlugin()
	]
};

module.exports = merge(baseConfig, devConfig);
