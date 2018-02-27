if (process.env.TIMESTAMP) {
	require('console-stamp')(console, {
		pattern: 'HH:MM:ss',
		label: false
	});
}

const nib = require('nib');
const {
	dirname,
	resolve,
	basename,
	sep,
	join
} = require('path');
const { readFileSync } = require('fs');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {
	NoEmitOnErrorsPlugin,
	WatchIgnorePlugin,
	DefinePlugin,
	LoaderOptionsPlugin,
	BannerPlugin
} = require('webpack');

const PROJECT_ROOT = resolve(__dirname, '../');
const supportedBrowserslist = [
	'last 3 versions',
	'Explorer >= 11',
	'Safari >= 9'
];
const stylusLoaderOptions = {
	sourceMap: true,
	use: nib(),
	import: [
		join(PROJECT_ROOT, 'src', 'styles', 'variables.styl'),
		join(PROJECT_ROOT, 'src', 'styles', 'mixins.styl'),
		getModifiedNib(require.resolve('verstat-nib'))
	],
	preferPathResolver: 'webpack'
};
const postcssLoaderOptions = {
	sourceMap: true,
	config: {
		path: join(PROJECT_ROOT, 'configs', 'postcss.config.js'),
		ctx: {
			autoprefixer: {
				browsers: supportedBrowserslist
			}
		}
	}
};
function customReadFile(file, encoding = 'utf8') {
	return readFileSync(file, { encoding });
}
function getModifiedNib(path) {
	const dirPath = dirname(path);
	if (customReadFile(path).indexOf('path: fallback') !== -1) {
		return join(dirPath, 'nib-mod-fallback.styl');
	}
	return join(dirPath, 'nib-mod.styl');
}

const baseConfig = {
	output: {
		path: join(PROJECT_ROOT, 'dist')
	},
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
			modernizr$: join(PROJECT_ROOT, '.modernizrrc')
		}
	},
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|ico)$/,
				use: {
					loader: 'file-loader',
					options: { name: 'assets/i/[path][name].[ext]' }
				}
			},
			{
				test: /\.(mp4|webm)$/,
				use: {
					loader: 'file-loader',
					options: { name: 'assets/v/[path][name].[ext]' }
				}
			},
			{
				test: /\.svg$/,
				exclude: /font|f|fonts/,
				use: {
					loader: 'file-loader',
					options: { name: 'assets/i/[path][name].[ext]' }
				}
			},
			{
				test: /\.(eot|ttf|woff|woff2|svg)$/,
				include: /font|f|fonts/,
				use: {
					loader: 'file-loader',
					options: { name: 'assets/f/[path][name].[ext]' }
				}
			},
			{
				test: /\.modernizrrc.js$/,
				use: 'modernizr-loader'
			},
			{
				test: /\.modernizrrc(\.json)?$/,
				use: ['modernizr-loader', 'json-loader']
			},
			{
				test: /\.json$/,
				use: 'happypack/loader?id=json'
			},
			{
				test: /\.html$/,
				use: 'happypack/loader?id=html'
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'happypack/loader?id=js'
			}
		]
	},
	plugins: [
		new DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
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
					'.DS_Store'
				]
			}
		]),
		new NoEmitOnErrorsPlugin(),
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
		}),
		new LoaderOptionsPlugin({
			options: {
				customInterpolateName: (url, name, options) => {
					const prefix = name.replace('[path][name].[ext]', '');
					const directory = dirname(url).split(sep).pop();
					return join(
						prefix,
						prefix.split(sep).indexOf(directory) === -1 ? directory : '',
						basename(url)
					);
				}
			}
		}),
		new HappyPack({
			id: 'json',
			verbose: false,
			threadPool: happyThreadPool,
			loaders: ['json-loader']
		}),
		new HappyPack({
			id: 'html',
			verbose: false,
			threadPool: happyThreadPool,
			loaders: [{
				path: 'html-loader',
				query: { attrs: ['img:src', 'link:href'] }
			}]
		}),
		new HappyPack({
			id: 'js',
			verbose: false,
			threadPool: happyThreadPool,
			loaders: [
				{
					path: 'babel-loader',
					query: {
						cacheDirectory: true,
						babelrc: false,
						plugins: [
							'lodash',
							'transform-decorators',
							'syntax-dynamic-import',
							'dynamic-import-webpack',
							'transform-class-properties',
							'transform-runtime',
							'transform-object-rest-spread'
						],
						presets: [
							'react',
							[
								'env',
								{
									targets: { browsers: supportedBrowserslist },
									modules: false
								}
							]
						]
					}
				}
			]
		})
	]
};

module.exports = {
	PROJECT_ROOT,
	baseConfig,
	happyThreadPool,
	postcssLoaderOptions,
	stylusLoaderOptions
};
