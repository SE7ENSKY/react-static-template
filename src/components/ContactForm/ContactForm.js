import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { InputField, TextareaField } from 'components/Form';
import { TEXT, EMAIL, CONTACT_FORM } from 'store/constants';
import validateForm from 'utils/validateForm';

class ContactForm extends Component {
	static propTypes = {
		handleSubmit: func.isRequired,
		submitting: bool.isRequired,
	};

	handleDataSubmit = data => validateForm(CONTACT_FORM, data)
		.then(() => {
			console.log('CONTACT_FORM submit data: ', data);
		});

	render() {
		const { handleSubmit, submitting } = this.props;

		return (
			<form
				className='contact-form'
				onSubmit={handleSubmit(this.handleDataSubmit)}
			>
				<Field
					name='name'
					component={InputField}
					placeholder='Name'
					type={TEXT}
				/>
				<Field
					name='email'
					component={InputField}
					placeholder='Email'
					type={EMAIL}
				/>
				<Field
					name='description'
					component={TextareaField}
					placeholder='Description'
				/>
				<button
					className='contact-form__submit'
					disabled={submitting}
				>
					Send
				</button>
			</form>
		);
	}
}

export default reduxForm({
	form: CONTACT_FORM,
})(ContactForm);
