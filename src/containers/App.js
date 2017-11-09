import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from 'store/createStore';
import Loadable from 'react-loadable';


const LoadableCoreLayout = Loadable({
	loader: () => import('layouts/CoreLayout'),
	loading() {
		return (<div>Loading...</div>);
	}
});

function App() {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Route path='/' component={LoadableCoreLayout} />
			</ConnectedRouter>
		</Provider>
	);
}

export default App;
