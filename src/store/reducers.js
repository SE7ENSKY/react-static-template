import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counterReducer from 'reducers/modules/counter';

export default combineReducers({
	router: routerReducer,
	counter: counterReducer
});
