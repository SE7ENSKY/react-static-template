import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from 'reducers/modules/counter';

export default combineReducers({
	router: routerReducer,
	counter
});
