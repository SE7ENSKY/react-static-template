import React from 'react';
import { shape, string, bool } from 'prop-types';
import classNames from 'classnames';

const TextareaField = (props) => {
	const {
		input,
		meta: {
			touched,
			error,
			active,
		},
		placeholder
	} = props;
	const hasError = touched && error && !active;

	return (
		<div className='form-control'>
			<textarea
				className={classNames('form-control__textarea', {
					'form-control__textarea_error': hasError,
				})}
				id={`field-${input.name}`}
				{...input}
				placeholder={placeholder}
			/>
			{
				hasError &&
				<span className='form-control__error'>{error}</span>
			}
		</div>
	);
};

TextareaField.propTypes = {
	input: shape({
		name: string,
	}).isRequired,
	meta: shape({
		touched: bool,
		error: string,
		active: bool,
	}).isRequired,
	placeholder: string,
};

TextareaField.defaultProps = {
	placeholder: '',
};

export default TextareaField;
