import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from 'store/createStore';
import CoreLayout from 'layouts/CoreLayout';


const AppContainer = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Route path='/' component={CoreLayout} />
		</ConnectedRouter>
	</Provider>
);

export default AppContainer;
