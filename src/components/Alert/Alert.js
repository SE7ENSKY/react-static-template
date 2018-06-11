import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import './Alert.styl';


const Alert = (props) => {
	const {
		modifier,
		text
	} = props;

	return (
		<div
			className={classNames('alert', { [modifier]: !!modifier })}
			role='alert'
		>
			{text}
		</div>
	);
};

Alert.propTypes = {
	modifier: string,
	text: string
};

Alert.defaultProps = {
	modifier: 'alert-danger',
	text: 'Ой, что-то пошло не так. Пожалуйста, перезагрузите страницу.'
};

export default Alert;
