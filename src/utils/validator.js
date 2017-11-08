import {
	required,
	email
} from 'redux-form-validators';

const validations = {
	'contact-form': {
		name: [required()],
		email: [required(), email()],
		description: [required()],
	},
};

const validator = formName => (values) => {
	const validation = validations[formName];
	if (!validation) return {};

	const errors = Object.keys(validation).reduce((prev, field) => {
		const value = values[field];
		const check = validation[field].map(validateField => validateField(value, values)).find(x => x);

		if (!check) return prev;
		return {
			...prev,
			[field]: check,
		};
	}, {});

	return errors;
};

export default validator;
