import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { updateLocation } from 'redux/modules/location';
import makeRootReducer from './reducers';

const createStore = (initialState = {}) => {
	const middleware = [thunk];
	const enhancers = [];

	if (process.env.NODE_ENV === 'development') {
		const devToolsExtension = window.devToolsExtension;
		if (typeof devToolsExtension === 'function') {
			enhancers.push(devToolsExtension());
		}
	}

	const store = createReduxStore(
		makeRootReducer(),
		initialState,
		compose(
			applyMiddleware(...middleware),
			...enhancers
		)
	);
	store.asyncReducers = {};

	// Uncomment to handle history change in store
	store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const reducers = require('./reducers').default;
			store.replaceReducer(reducers(store.asyncReducers));
		});
	}

	return store;
};

export default createStore;
