const configMerge = require('webpack-merge');
const { join } = require('path');
const { merge } = require('lodash');
const cssMQpacker = require('css-mqpacker');
const perfectionist = require('perfectionist');
const cssNano = require('cssnano');
const HappyPack = require('happypack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const StylesPostprocessorPlugin = require('styles-postprocessor-plugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
// const OfflinePlugin = require('offline-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
	PROJECT_ROOT,
	baseConfig,
	happyThreadPool,
	postcssLoaderOptions,
	stylusLoaderOptions
} = require('./webpack.base.config');

const cssnanoBaseConfig = {
	autoprefixer: false,
	rawCache: true,
	calc: false,
	colormin: false,
	convertValues: false,
	discardComments: false,
	discardDuplicates: true,
	discardEmpty: true,
	discardOverridden: false,
	discardUnused: false,
	mergeIdents: false,
	mergeLonghand: false,
	mergeRules: true,
	minifyFontValues: {
		removeAfterKeyword: false,
		removeDuplicates: true,
		removeQuotes: false
	},
	minifyGradients: false,
	minifyParams: false,
	minifySelectors: false,
	normalizeCharset: false,
	normalizeDisplayValues: false,
	normalizePositions: false,
	normalizeRepeatStyle: false,
	normalizeString: false,
	normalizeTimingFunctions: false,
	normalizeUnicode: false,
	normalizeUrl: false,
	normalizeWhitespace: false,
	orderedValues: true,
	reduceIdents: false,
	reduceInitial: false,
	reduceTransforms: false,
	svgo: false,
	uniqueSelectors: true,
	zindex: false
};
const cssnanoMinConfig = {
	discardComments: {
		removeAllButFirst: true
	},
	normalizeWhitespace: true
};
const stylesPostprocessorPlugins = [
	cssMQpacker(),
	cssNano(merge({}, cssnanoBaseConfig, process.env.BEAUTIFY ? {} : cssnanoMinConfig))
];
if (process.env.BEAUTIFY) {
	stylesPostprocessorPlugins.push(perfectionist({
		cascade: true,
		colorCase: 'lower',
		colorShorthand: false,
		format: 'expanded',
		indentChar: ' ',
		indentSize: 2,
		trimLeadingZero: false,
		trimTrailingZeros: true,
		maxAtRuleLength: false,
		maxSelectorLength: 1,
		maxValueLength: false,
		sourcemap: false,
		zeroLengthNoUnit: true
	}));
}

const prodConfig = {
	entry: {
		main: join(PROJECT_ROOT, 'src', 'main.js')
	},
	output: {
		publicPath: '/',
		filename: `assets/[name]${process.env.BEAUTIFY ? '' : '.min'}.[chunkhash:8].js`,
		chunkFilename: `assets/[name].chunk${process.env.BEAUTIFY ? '' : '.min'}.[chunkhash:8].js`
	},
	watch: false,
	devtool: process.env.SOURCEMAP ? 'source-map' : false,
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: 'happypack/loader?id=css',
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(sass|scss)$/,
				use: ExtractTextPlugin.extract({
					use: 'happypack/loader?id=sass',
					fallback: 'style-loader'
				})
			},
			{
				test: /\.styl$/,
				use: ExtractTextPlugin.extract({
					use: 'happypack/loader?id=styl',
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
			filename: `assets/[name]${process.env.BEAUTIFY ? '' : '.min'}.[chunkhash:8].css`,
			allChunks: true
		}),
		new StylesPostprocessorPlugin({
			root: PROJECT_ROOT,
			output: baseConfig.output.path,
			plugins: stylesPostprocessorPlugins
		}),
		new HappyPack({
			id: 'css',
			verbose: false,
			threadPool: happyThreadPool,
			loaders: [
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

if (!process.env.BEAUTIFY) {
	prodConfig.plugins.push(new UglifyJsPlugin({
		sourceMap: true,
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

if (!process.env.TIMESTAMP) {
	prodConfig.plugins.push(new ProgressBarPlugin({
		width: 40,
		summary: false
	}));
}

if (process.env.SOURCEMAP) {
	prodConfig.plugins.push(new Visualizer({
		filename: './bundle-statistics.html'
	}));
}

// if (process.env.NODE_ENV === 'production') {
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
