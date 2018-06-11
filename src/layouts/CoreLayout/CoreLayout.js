import React, { Fragment } from 'react';
import {
	Route,
	Switch
} from 'react-router-dom';
import Loadable from 'react-loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';


function Loading(props) {
	if (props.error) {
		return <div>Error!</div>;
	} else if (props.pastDelay) {
		return <div>Loading...</div>;
	} else {
		return null;
	}
}
const LoadableHome = Loadable({
	loader: () => import('routes/Home'),
	loading: Loading
});
const LoadableAbout = Loadable({
	loader: () => import('routes/About'),
	loading: Loading
});

function CoreLayout() {
	return (
		<Fragment>
			<Header />
			<div className='main'>
				<Switch>
					<Route exact path='/' component={LoadableHome} />
					<Route exact path='/about-us' component={LoadableAbout} />
				</Switch>
			</div>
			<Footer />
		</Fragment>
	);
}

export default CoreLayout;
