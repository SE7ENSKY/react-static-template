export default errors => Object.keys(errors)
	.map(key => ({ [key]: errors[key].join(' ') }))
	.reduce((acc, curr) => ({ ...acc, ...curr }), {});
