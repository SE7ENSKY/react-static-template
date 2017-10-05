require('console-stamp')(console, {
	pattern: 'HH:MM:ss',
	label: false
});

const { join } = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackProdConfig = require('../config/webpack.prod.config.js');
const webpackBaseConfig = require('../config/webpack.base.config.js');

const port = 8080;
const app = express();
const compiler = webpack(webpackProdConfig);
compiler.run((err, stats) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(stats.toString({
		colors: true,
		hash: false,
		chunks: false,
		timings: false,
		chunkModules: false,
		modules: false
	}));
});
// TODO compiler.plugin ?
compiler.plugin('done', function (stats) {
	app.use(express.static(webpackBaseConfig.baseConfig.output.path));
	app.get('*', function response(req, res) {
		res.sendFile(join(webpackBaseConfig.baseConfig.output.path, 'index.html'));
	});
	// TODO ip
	app.listen(port, 'localhost', function onStart(err) {
		if (err) console.log(err);
		console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
	});
});
