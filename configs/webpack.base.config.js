const {
	TIMESTAMP,
	NODE_ENV
} = process.env;

if (TIMESTAMP) {
	require('console-stamp')(console, {
		pattern: 'HH:MM:ss.l',
		label: false
	});
}

const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {
	NoEmitOnErrorsPlugin,
	WatchIgnorePlugin,
	DefinePlugin,
	BannerPlugin,
	IgnorePlugin
} = require('webpack');
const PROJECT_ROOT = require('./project.root.js');


const baseConfig = {
	output: {
		path: join(PROJECT_ROOT, 'dist')
	},
	performance: {
		hints: false
	},
	mode: NODE_ENV,
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	},
	resolve: {
		modules: [
			join(PROJECT_ROOT, 'src'),
			'node_modules'
		],
		extensions: [
			'.js',
			'.jsx',
			'.json',
			'.css',
			'.styl',
			'.sass',
			'.scss',
			'.png',
			'.jpg',
			'.jpeg',
			'.gif',
			'.mp4'
		],
		alias: {
			components: join(PROJECT_ROOT, 'src', 'components'),
			configurations: join(PROJECT_ROOT, 'src', 'configurations'),
			containers: join(PROJECT_ROOT, 'src', 'containers'),
			decorators: join(PROJECT_ROOT, 'src', 'decorators'),
			layouts: join(PROJECT_ROOT, 'src', 'layouts'),
			reducers: join(PROJECT_ROOT, 'src', 'reducers'),
			routes: join(PROJECT_ROOT, 'src', 'routes'),
			static: join(PROJECT_ROOT, 'src', 'static'),
			f: join(PROJECT_ROOT, 'src', 'static', 'f'),
			i: join(PROJECT_ROOT, 'src', 'static', 'i'),
			v: join(PROJECT_ROOT, 'src', 'static', 'v'),
			store: join(PROJECT_ROOT, 'src', 'store'),
			styles: join(PROJECT_ROOT, 'src', 'styles'),
			utils: join(PROJECT_ROOT, 'src', 'utils'),
			vendor: join(PROJECT_ROOT, 'src', 'vendor')
		}
	},
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|ico|eot|ttf|woff|woff2|svg|mp4|webm)$/,
				use: 'file-loader'
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: { attrs: ['img:src', 'link:href'] }
				}
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					}
				}
			}
		]
	},
	plugins: [
		new DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) },
			__DEV__: NODE_ENV === 'development'
		}),
		new BannerPlugin({
			banner: '\n' + '@version: 1.0.0' + '\n\n' + '@author: SE7ENSKY Frontend studio <info@se7ensky.com>\n'
		}),
		new CleanWebpackPlugin(
			[
				'dist'
				// 'coverage'
			],
			{
				root: PROJECT_ROOT,
				verbose: true,
				watch: false,
				dry: false
			}
		),
		new CopyWebpackPlugin([
			{
				from: 'src/static',
				to: 'assets',
				ignore: [
					// 'i/*',
					'v/*',
					'f/*',
					'*.js',
					'*.mjml',
					'.DS_Store'
				]
			}
		]),
		new NoEmitOnErrorsPlugin(),
		new IgnorePlugin(/^\.\/locale$/, /moment$/), // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack#using-ignoreplugin
		new WatchIgnorePlugin([join(PROJECT_ROOT, 'node_modules')]),
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			filename: 'index.html',
			hash: false,
			cache: true,
			inject: false,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				minifyJS: false
			}
		})
	]
};

module.exports = baseConfig;
