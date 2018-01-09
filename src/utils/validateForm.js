import { SubmissionError } from 'redux-form';
import formValidationRules from '../configurations/formValidationRules';

const validator = validationRules => (values) => {
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

export default (formName, data) => Promise.resolve()
	.then(() => {
		const validationRules = formValidationRules[formName];
		const errors = validator(validationRules)(data);

		if (Object.keys(errors).length) {
			throw new SubmissionError(errors);
		}
	});
