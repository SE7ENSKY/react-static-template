import React from 'react';
import Spinkit from 'react-spinkit';
import './Spinner.styl';


const Spinner = props => (
	<div className='spinner'>
		<Spinkit {...props} />
	</div>
);

export default Spinner;
