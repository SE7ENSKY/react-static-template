const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';


module.exports = {
	colors: true,
	builtAt: false,
	hash: isProduction,
	chunks: false,
	timings: isProduction,
	chunkModules: false,
	modules: false,
	assets: true,
	children: false
};
