export default (temp) => {
	const rounded = Math.round(temp);

	return `${rounded > 0 ? '+' : ''}${rounded}${String.fromCharCode(176)}`;
};
