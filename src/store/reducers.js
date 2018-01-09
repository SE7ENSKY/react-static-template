import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import counter from 'reducers/modules/counter';

export default combineReducers({
	router: routerReducer,
	form: formReducer,
	counter
});
