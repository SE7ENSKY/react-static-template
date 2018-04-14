const webpackBaseConfig = require('./webpack.base.config.js');
const webpackDevConfig = require('./webpack.dev.config.js');
const serverPort = require('./server.port.js');
const webpackStats = require('./webpack.stats');


module.exports = {
	watchOptions: {
		ignored: /node_modules/
	},
	contentBase: webpackBaseConfig.output.path,
	publicPath: webpackDevConfig.output.publicPath,
	headers: {
		'Access-Control-Allow-Origin': '*'
	},
	historyApiFallback: true,
	compress: false,
	hot: true,
	lazy: false,
	inline: true,
	host: 'localhost',
	port: serverPort,
	stats: webpackStats
};
