const { join } = require('path');
const PROJECT_ROOT = require('./project.root.js');


module.exports = {
	resources: [
		join(PROJECT_ROOT, 'src', 'styles', 'variables.scss'),
		join(PROJECT_ROOT, 'src', 'styles', 'functions.scss'),
		join(PROJECT_ROOT, 'src', 'styles', 'mixins.scss'),
		join(PROJECT_ROOT, 'src', 'styles', 'helpers.scss')
	]
};
