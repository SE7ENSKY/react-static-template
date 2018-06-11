export default value => value.toString()
	.split('')
	.reverse()
	.map((d, i) => (i > 0 && i % 3 === 0 ? `${d} ` : d))
	.reverse()
	.join('');
