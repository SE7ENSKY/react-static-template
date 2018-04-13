import React from 'react';
import {
	Route,
	Switch
} from 'react-router-dom';
import Loadable from 'react-loadable';
import ComponentsContainer from 'containers/ComponentsContainer';
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
		<ComponentsContainer>
			<Header />
			<div className='main'>
				<Switch>
					<Route exact path='/' component={LoadableHome} />
					<Route exact path='/about-us' component={LoadableAbout} />
				</Switch>
			</div>
			<Footer />
		</ComponentsContainer>
	);
}

export default CoreLayout;
