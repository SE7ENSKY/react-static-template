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
		colors: true
	}));
});
app.use(express.static(webpackBaseConfig.baseConfig.output.path));
app.listen(port);
