import React from 'react';
import { string, bool } from 'prop-types';
import Loader from '../Loader';

const LoadingComponent = (props) => {
	const { error, pastDelay } = props;

	if (error) {
		return <div>Error: loading component failed.</div>;
	} else if (pastDelay) {
		return <Loader />;
	}
	return null;
};

LoadingComponent.propTypes = {
	error: string,
	pastDelay: bool,
};

LoadingComponent.defaultProps = {
	error: '',
	pastDelay: false,
};


export default LoadingComponent;
