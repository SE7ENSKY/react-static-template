export default validationRules => (values) => {
	if (!validationRules) return {};

	const errors = Object.keys(validationRules).reduce((prev, field) => {
		const value = values[field];
		const check = validationRules[field]
			.map(validateField => validateField(value, values))
			.find(x => x);

		if (!check) return prev;
		return {
			...prev,
			[field]: check,
		};
	}, {});

	return errors;
};
