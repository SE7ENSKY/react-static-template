const { NODE_ENV } = process.env;

require('console-stamp')(console, {
	pattern: 'HH:MM:ss.l',
	label: false
});

const { join } = require('path');
const express = require('express');
const cors = require('cors');
const compress = require('compression');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackBaseConfig = require('../configs/webpack.base.config.js');
const webpackDevConfig = require('../configs/webpack.dev.config.js');
const webpackDevServerConfig = require('../configs/webpack.dev.server.config.js');
const webpackProdConfig = require('../configs/webpack.prod.config.js');
const serverPort = require('../configs/server.port.js');


const isDevelopment = NODE_ENV === 'development';
const app = express();
const compiler = webpack(isDevelopment ? webpackDevConfig : webpackProdConfig);
app.use(cors());

if (isDevelopment) {
	const middleware = webpackDevMiddleware(compiler, webpackDevServerConfig);
	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	middleware.waitUntilValid(function () {
		app.get('*', function response(req, res) {
			res.write(middleware.fileSystem.readFileSync(join(webpackBaseConfig.output.path, 'index.html')));
			res.end();
		});
		app.listen(serverPort, '0.0.0.0', function onStart(err) {
			if (err) console.log(err);
			console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', serverPort, serverPort);
		});
	});
} else {
	compiler.run((err, stats) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(stats.toString(webpackDevServerConfig.stats));
	});
	compiler.plugin('done', function (stats) {
		app.use(compress());
		app.use(express.static(webpackBaseConfig.output.path, { extensions: ['html'] }));
		app.get('*', function response(req, res) {
			res.sendFile(join(webpackBaseConfig.output.path, 'index.html'));
		});
		app.listen(serverPort, '0.0.0.0', function onStart(err) {
			if (err) console.log(err);
			console.log('webpack: Compiled successfully.');
			console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', serverPort, serverPort);
		});
	});
}
