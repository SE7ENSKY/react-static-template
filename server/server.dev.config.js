const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('../config/webpack.dev.config.js');


const port = 3000;
const devServerConfig = {
	watchOptions: {
		ignored: /node_modules/
	},
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
		chunks: false,
		children: false,
		modules: false
	}
};

const app = express();
const compiler = webpack(webpackDevConfig);
app.use(webpackDevMiddleware(compiler, devServerConfig));
app.use(webpackHotMiddleware(compiler));
app.listen(port);
