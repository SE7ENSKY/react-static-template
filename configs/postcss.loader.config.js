const { SOURCEMAP } = process.env;

const { join } = require('path');
const browsersList = require('./browsers.list.js');
const PROJECT_ROOT = require('./project.root.js');


module.exports = {
	sourceMap: !SOURCEMAP,
	config: {
		path: join(PROJECT_ROOT, 'configs', 'postcss.config.js'),
		ctx: {
			autoprefixer: {
				browsers: browsersList
			}
		}
	}
};
