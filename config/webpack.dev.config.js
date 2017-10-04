const configMerge = require('webpack-merge');
const { join } = require('path');
const {
	HotModuleReplacementPlugin,
	NamedModulesPlugin
} = require('webpack');
const {
	PROJECT_ROOT,
	baseConfig,
	postcssLoaderOptions,
	stylusLoader
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
					stylusLoader
				]
			}
		]
	},
	plugins: [
		new HotModuleReplacementPlugin(),
		new NamedModulesPlugin()
	]
};

module.exports = configMerge(baseConfig, devConfig);
