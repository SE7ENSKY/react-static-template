const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('../config/webpack.dev.config.js');
const webpackProdConfig = require('../config/webpack.prod.config.js');


const env = JSON.stringify(process.env.NODE_ENV);
const port = env === 'development' ? 3000 : 8080;
const devServerConfig = {
	watchOptions: {
		ignored: /node_modules/
	},
	publicPath: webpackDevConfig.output.publicPath,
	historyApiFallback: true,
	compress: false,
	hot: env === 'development',
	lazy: false,
	inline: true,
	host: 'localhost',
	port,
	stats: {
		colors: true
	}
};

const app = express();
const compiler = webpack(webpackDevConfig);

app.use(webpackDevMiddleware(compiler, devServerConfig));
if (env === 'development') {
	app.use(webpackHotMiddleware(compiler));
}
app.listen(port);
