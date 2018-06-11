export default params => Object.keys(params)
	.map((key) => {
		if (typeof params[key] !== 'object' && params[key] !== null) {
			return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
		}

		const innerObj = params[key];
		const name = encodeURIComponent(key);

		return Object.keys(innerObj).map(k =>
			`${name}[${encodeURIComponent(k)}]=${encodeURIComponent(params[key][k])}`)
			.join('&');
	})
	.join('&');
