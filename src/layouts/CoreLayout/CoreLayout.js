import React from 'react';
import PropTypes from 'prop-types';

const CoreLayout = ({children}) => (
	<div className="main">
		{children}
	</div>
);

CoreLayout.propTypes = {
	children: PropTypes.object.isRequired
};

export default CoreLayout;
