const configMerge = require('webpack-merge');
const { join } = require('path');
const { merge } = require('lodash');
const cssMQpacker = require('css-mqpacker');
const perfectionist = require('perfectionist');
const cssNano = require('cssnano');
const StylesPostprocessorPlugin = require('styles-postprocessor-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const BeautifyHtmlPlugin = require('beautify-html-plugin');
const {
	optimize: {
		UglifyJsPlugin,
		CommonsChunkPlugin
	}
} = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
	PROJECT_ROOT,
	baseConfig,
	postcssLoaderOptions,
	stylusLoader
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
		removeAll: true
	},
	normalizeWhitespace: true
};
const stylesPostprocessorPlugins = [
	cssMQpacker(),
	cssNano(merge(cssnanoBaseConfig, JSON.stringify(process.env.BEAUTIFY) ? cssnanoMinConfig : {}))
];
if (JSON.stringify(process.env.BEAUTIFY)) {
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
		filename: `assets/[name]${JSON.stringify(process.env.BEAUTIFY) ? '' : '.min'}.[chunkhash:8].js`
	},
	watch: false,
	devtool: JSON.stringify(process.env.SOURCEMAP) ? 'source-map' : false,
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [
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
							options: postcssLoaderOptions
						},
						{
							loader: 'resolve-url-loader',
							options: {
								includeRoot: true
							}
						},
						stylusLoader
					],
					fallback: 'style-loader'
				})
			}
		]
	},
	plugins: [
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'defer'
		}),
		new BeautifyHtmlPlugin({ ocd: true }),
		new CommonsChunkPlugin({
			name: 'main.vendor',
			filename: `assets/[name]${JSON.stringify(process.env.BEAUTIFY) ? '' : '.min'}.[chunkhash:8].js`,
			minChunks: (module, count) => /node_modules/.test(module.resource) && count >= 1
		}),
		new ExtractTextPlugin({
			filename: 'assets/[name].min.[chunkhash:8].css',
			allChunks: true
		}),
		new StylesPostprocessorPlugin({
			root: PROJECT_ROOT,
			output: baseConfig.output.path,
			plugins: stylesPostprocessorPlugins
		})
	]
};

if (!JSON.stringify(process.env.BEAUTIFY)) {
	prodConfig.plugins.push(new UglifyJsPlugin({
		sourceMap: true,
		mangle: {
			screw_ie8: true
		},
		comments: false,
		compress: {
			screw_ie8: true,
			unused: true,
			dead_code: true,
			warnings: false
		}
	}));
}

module.exports = configMerge(baseConfig, prodConfig);
