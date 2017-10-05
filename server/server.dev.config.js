require('console-stamp')(console, {
	pattern: 'HH:MM:ss',
	label: false
});

const { join } = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('../config/webpack.dev.config.js');
const webpackBaseConfig = require('../config/webpack.base.config.js');

// TODO один файл на dev i prod
const port = 3000;
const devServerConfig = {
	watchOptions: {
		ignored: /node_modules/
	},
	contentBase: webpackBaseConfig.baseConfig.output.path,
	publicPath: webpackDevConfig.output.publicPath,
	historyApiFallback: true,
	compress: false,
	hot: true,
	lazy: false,
	inline: true,
	host: 'localhost',
	port,
	stats: {
		colors: true,
		hash: false,
		chunks: false,
		timings: false,
		chunkModules: false,
		modules: false
	}
};

const app = express();
const compiler = webpack(webpackDevConfig);
const middleware = webpackDevMiddleware(compiler, devServerConfig);
app.use(middleware);
app.use(webpackHotMiddleware(compiler));

// TODO middleware.waitUntilValid ?
middleware.waitUntilValid(function () {
	app.get('*', function response(req, res) {
		res.write(middleware.fileSystem.readFileSync(join(webpackBaseConfig.baseConfig.output.path, 'index.html')));
		res.end();
	});

	// TODO ip
	app.listen(port, 'localhost', function onStart(err) {
		if (err) console.log(err);
		console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
	});
});
