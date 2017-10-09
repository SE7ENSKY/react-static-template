require("console-stamp")(console, {
	pattern: "HH:MM:ss",
	label: false
});

const { join } = require("path");
const express = require("express");
const cors = require("cors");
const compress = require("compression");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackBaseConfig = require("../config/webpack.base.config.js");
const webpackDevConfig = require("../config/webpack.dev.config.js");
const webpackProdConfig = require("../config/webpack.prod.config.js");

const port = process.env.NODE_ENV === "development" ? 3000 : 8080;
const devServerConfig = {
	watchOptions: {
		ignored: /node_modules/
	},
	contentBase: webpackBaseConfig.baseConfig.output.path,
	publicPath: webpackDevConfig.output.publicPath,
	headers: {
		"Access-Control-Allow-Origin": "*"
	},
	historyApiFallback: true,
	compress: false,
	hot: true,
	lazy: false,
	inline: true,
	host: "localhost",
	port,
	stats: {
		colors: true,
		hash: process.env.NODE_ENV === "production",
		chunks: false,
		timings: process.env.NODE_ENV === "production",
		chunkModules: false,
		modules: false,
		assets: true,
		children: false
	}
};

const app = express();
const compiler = webpack(process.env.NODE_ENV === "development" ? webpackDevConfig : webpackProdConfig);
app.use(cors());

if (process.env.NODE_ENV === "development") {
	const middleware = webpackDevMiddleware(compiler, devServerConfig);
	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	middleware.waitUntilValid(function () {
		app.get("*", function response(req, res) {
			res.write(middleware.fileSystem.readFileSync(join(webpackBaseConfig.baseConfig.output.path, "index.html")));
			res.end();
		});
		app.listen(port, "localhost", function onStart(err) {
			if (err) console.log(err);
			console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
		});
	});
} else {
	compiler.run((err, stats) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(stats.toString(devServerConfig.stats));
	});
	compiler.plugin("done", function (stats) {
		app.use(compress());
		app.use(express.static(webpackBaseConfig.baseConfig.output.path));
		app.get("*", function response(req, res) {
			res.sendFile(join(webpackBaseConfig.baseConfig.output.path, "index.html"));
		});
		app.listen(port, "localhost", function onStart(err) {
			if (err) console.log(err);
			console.log("webpack: Compiled successfully.");
			console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
		});
	});
}
