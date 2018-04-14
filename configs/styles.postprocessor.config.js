const { BEAUTIFY } = process.env;

const cssMQpacker = require('css-mqpacker');
const cssNano = require('cssnano');
const { merge } = require('lodash');
const perfectionist = require('perfectionist');
const baseConfig = require('./webpack.base.config');
const cssnanoBaseConfig = require('./cssnano.base.config');
const cssnanoMinConfig = require('./cssnano.minify.config');
const perfectionistConfig = require('./perfectionist.config');
const PROJECT_ROOT = require('./project.root.js');


const plugins = [
	cssMQpacker(),
	cssNano(merge({}, cssnanoBaseConfig, BEAUTIFY ? {} : cssnanoMinConfig))
];

if (BEAUTIFY) {
	plugins.push(perfectionist(perfectionistConfig));
}

module.exports = {
	root: PROJECT_ROOT,
	output: baseConfig.output.path,
	plugins
};
