import React from 'react';
import {
	Route,
	Switch
} from 'react-router-dom';
import Loadable from 'react-loadable';
import 'normalize.css/normalize.css';
import 'styles/main.styl';


const LoadableHeader = Loadable({
	loader: () => import('components/Header'),
	loading() {
		return (<div>Loading...</div>);
	}
});
const LoadableFooter = Loadable({
	loader: () => import('components/Footer'),
	loading() {
		return (<div>Loading...</div>);
	}
});
const LoadableHome = Loadable({
	loader: () => import('routes/Home'),
	loading() {
		return (<div>Loading...</div>);
	}
});
const LoadableAbout = Loadable({
	loader: () => import('routes/About'),
	loading() {
		return (<div>Loading...</div>);
	}
});

function CoreLayout() {
	return (
		<div className='app'>
			<LoadableHeader />
			<div className='main'>
				<Switch>
					<Route exact path='/' component={LoadableHome} />
					<Route exact path='/about-us' component={LoadableAbout} />
				</Switch>
			</div>
			<LoadableFooter />
		</div>
	);
}

export default CoreLayout;
