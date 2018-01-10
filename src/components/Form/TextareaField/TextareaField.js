import React from 'react';
import { shape, string, bool } from 'prop-types';
import classNames from 'classnames';

const TextareaField = (props) => {
	const { input, meta, placeholder } = props;

	return (
		<div className='form-control'>
			<textarea
				className={classNames('form-control__textarea', {
					'form-control__textarea_error': meta.touched && meta.error && !meta.active,
				})}
				id={`field-${input.name}`}
				{...input}
				placeholder={placeholder}
			/>
			{
				meta.touched && meta.error && !meta.active &&
				<span className='form-control__error'>{meta.error}</span>
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
