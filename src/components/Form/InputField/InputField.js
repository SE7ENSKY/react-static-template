import React from 'react';
import { shape, string, bool } from 'prop-types';
import classNames from 'classnames';

const InputField = (props) => {
	const {
		input,
		meta: {
			touched,
			error,
			active,
		},
		type,
		placeholder,
	} = props;
	const hasError = touched && error && !active;

	return (
		<div className='form-control'>
			<input
				className={classNames('form-control__input', {
					'form-control__input_error': hasError,
				})}
				id={`field-${input.name}`}
				{...input}
				placeholder={placeholder}
				type={type}
			/>
			{
				hasError &&
				<span className='form-control__error'>{error}</span>
			}
		</div>
	);
};

InputField.propTypes = {
	input: shape({
		name: string,
	}).isRequired,
	meta: shape({
		touched: bool,
		error: string,
		active: bool,
	}).isRequired,
	type: string,
	placeholder: string,
};

InputField.defaultProps = {
	type: 'text',
	placeholder: '',
};

export default InputField;
