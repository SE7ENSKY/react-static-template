module.exports = {
	rootDir: '../',
	collectCoverageFrom: [
		'src/**/*.{js,jsx}'
	],
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.js?(x)',
		'<rootDir>/src/**/?(*.)(spec|test).js?(x)'
	],
	testEnvironment: 'node',
	testURL: 'http://localhost',
	transform: {
		'^.+\\.css$': '<rootDir>/configs/csstransform.config.js',
		'^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/configs/filetransform.config.js'
	},
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'
	],
	moduleFileExtensions: [
		'web.js',
		'js',
		'json',
		'web.jsx',
		'jsx',
		'node'
	]
};
