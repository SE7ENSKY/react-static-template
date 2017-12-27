/**
 * convert key-value data into FormData(https://developer.mozilla.org/ru/docs/Web/API/FormData)
 * @param {Object} data
 * @return {FormData}
 */
export default data => Object.keys(data)
	.reduce((prev, key) => {
		prev.append(key, data[key]);
		return prev;
	}, new FormData());
