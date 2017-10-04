const nib = require('nib');
const {
	dirname,
	resolve,
	basename,
	sep,
	join
} = require('path');
const { readFileSync } = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	NoEmitOnErrorsPlugin,
	WatchIgnorePlugin,
	DefinePlugin,
	LoaderOptionsPlugin
} = require('webpack');


const PROJECT_ROOT = resolve(__dirname, '../');
const supportedBrowserslist = [
	'last 4 versions',
	'ie >= 10'
];
const stylusLoader = {
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
};
const babelPlugins = [
	'transform-runtime',
	'transform-object-rest-spread'
];
if (JSON.stringify(process.env.NODE_ENV) === 'development') {
	babelPlugins.unshift('react-hot-loader/babel');
}
const postcssLoaderOptions = {
	sourceMap: true,
	config: {
		path: join(PROJECT_ROOT, 'config', 'postcss.config.js'),
		ctx: {
			cssnext: {
				autoprefixer: {
					browsers: supportedBrowserslist
				}
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
	cache: true,
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
			'.png',
			'.jpg',
			'.jpeg',
			'.gif',
			'.mp4'
		],
		alias: {
			components: join(PROJECT_ROOT, 'src', 'components'),
			containers: join(PROJECT_ROOT, 'src', 'containers'),
			layouts: join(PROJECT_ROOT, 'src', 'layouts'),
			reducers: join(PROJECT_ROOT, 'src', 'reducers'),
			routes: join(PROJECT_ROOT, 'src', 'routes'),
			static: join(PROJECT_ROOT, 'src', 'static'),
			f: join(PROJECT_ROOT, 'src', 'static', 'f'),
			i: join(PROJECT_ROOT, 'src', 'static', 'i'),
			v: join(PROJECT_ROOT, 'src', 'static', 'v'),
			store: join(PROJECT_ROOT, 'src', 'store'),
			styles: join(PROJECT_ROOT, 'src', 'styles')
		}
	},
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif)$/,
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
				test: /\.json$/,
				use: 'json-loader'
			},
			{
				test: /\.html$/,
				use: 'html-loader'
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
							plugins: babelPlugins,
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
			}
		]
	},
	plugins: [
		new DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
		}),
		new NoEmitOnErrorsPlugin(),
		new WatchIgnorePlugin([join(PROJECT_ROOT, 'node_modules')]),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			hash: false,
			cache: true,
			inject: 'body',
			minify: false
		}),
		new LoaderOptionsPlugin({
			options: {
				customInterpolateName: (url, name, options) => {
					const prefix = name.replace('[path][name].[ext]', '');
					const file = basename(url);
					const directory = dirname(url).split(sep).pop();
					return join(
						prefix,
						prefix.split(sep).indexOf(directory) === -1 ? directory : '',
						file
					);
				}
			}
		})
	]
};

module.exports = {
	PROJECT_ROOT,
	baseConfig,
	postcssLoaderOptions,
	stylusLoader
};
