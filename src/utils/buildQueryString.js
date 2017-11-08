export default params => Object.keys(params)
	.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
	.join('&');
