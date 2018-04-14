const { SOURCEMAP } = process.env;

const nib = require('nib');
const {
	dirname,
	join
} = require('path');
const { readFileSync } = require('fs');
const PROJECT_ROOT = require('./project.root.js');


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

module.exports = {
	sourceMap: !SOURCEMAP,
	use: nib(),
	import: [
		join(PROJECT_ROOT, 'src', 'styles', 'variables.styl'),
		join(PROJECT_ROOT, 'src', 'styles', 'functions.styl'),
		join(PROJECT_ROOT, 'src', 'styles', 'mixins.styl'),
		getModifiedNib(require.resolve('verstat-nib'))
	],
	preferPathResolver: 'webpack'
};
