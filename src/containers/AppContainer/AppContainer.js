import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from 'store/createStore';
import CoreLayout from 'layouts/CoreLayout';
import ScrollRestoration from 'components/ScrollRestoration';


const AppContainer = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<ScrollRestoration>
				<Route path='/' component={CoreLayout} />
			</ScrollRestoration>
		</ConnectedRouter>
	</Provider>
);

export default AppContainer;
