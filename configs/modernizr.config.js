const {
	NODE_ENV,
	BEAUTIFY
} = process.env;


module.exports = {
	'filename': `assets/modernizr-bundle${BEAUTIFY ? '' : '.min'}${NODE_ENV === 'production' ? '.[chunkhash]' : ''}.js`,
	'htmlWebpackPlugin': true,
	'minify': !BEAUTIFY,
	'options': [
		'setClasses'
	],
	'feature-detects': [
		'touchevents'
	]
};
