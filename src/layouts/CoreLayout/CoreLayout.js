import React from "react";
import PropTypes from "prop-types";


const CoreLayout = ({ children }) => (
	<div className="main">
		{children}
	</div>
);

CoreLayout.propTypes = {
	children: PropTypes.any.isRequired
};

export default CoreLayout;
