import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import {
	ConnectedRouter,
	routerReducer,
	routerMiddleware,
	push
} from 'react-router-redux';
// import reducers from 'reducers';
import 'normalize.css/normalize.css';
import 'styles/main.styl';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
	combineReducers({
		// ...reducers,
		router: routerReducer
	}),
	applyMiddleware(middleware)
);

initRender();

// Hot Module Replacement API
// https://github.com/gaearon/react-hot-loader/tree/master/docs
if (module.hot) {
	module.hot.accept('containers/App.js', () => initRender());
}

function initRender() {
	render.render(
		<AppContainer>
			<Provider store={store}>
				{ /* ConnectedRouter will use the store from Provider automatically */ }
				<ConnectedRouter history={history}>
					<div />
				</ConnectedRouter>
			</Provider>,
		</AppContainer>,
		document.querySelector('#app')
	);
}
