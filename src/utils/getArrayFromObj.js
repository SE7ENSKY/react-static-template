export default obj => Object.keys(obj).map(key => ({
	key,
	value: obj[key],
}));
