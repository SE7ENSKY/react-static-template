import React from 'react';
import { shape, string, bool } from 'prop-types';
import classNames from 'classnames';

const InputField = (props) => {
	const {
		input,
		meta,
		type,
		placeholder,
	} = props;

	return (
		<div className='form-control'>
			<input
				className={classNames('form-control__input', {
					'form-control__input_error': meta.touched && meta.error && !meta.active,
				})}
				id={`field-${input.name}`}
				{...input}
				placeholder={placeholder}
				type={type}
			/>
			{
				meta.touched && meta.error && !meta.active &&
				<span className='form-control__error'>{meta.error}</span>
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
