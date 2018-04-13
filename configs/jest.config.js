module.exports = {
	rootDir: '../',
	// automock: false,
	// browser: false,
	// bail: false,
	coverageDirectory: '<rootDir>/coverage',
	collectCoverageFrom: [
		'src/**/*.{js,jsx}',
		'!**/node_modules/**',
		'!**/vendor/**'
	],
	globals: {
		__DEV__: true,
	},
	verbose: true,
	moduleNameMapper: {
		'\\.(css|less|styl|scss|sass|sss)$': 'identity-obj-proxy',
	},
	transform: {
		'\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
		'^.+\\.css$': '<rootDir>/configs/csstransform.config.js',
		'^(?!.*\\.(js|jsx|json|css|less|styl|scss|sass|sss)$)': '<rootDir>/configs/filetransform.config.js'
	},
	// transformIgnorePatterns: [
	// 	'[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'
	// ],
	moduleFileExtensions: [
		'js',
		'json',
		'jsx',
		'node'
	]
};
