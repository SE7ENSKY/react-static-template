import { required, email } from 'redux-form-validators';
import { CONTACT_FORM } from '../store/constants';

export default {
	[CONTACT_FORM]: {
		name: [required()],
		email: [required(), email()],
		description: [required()],
	},
};
