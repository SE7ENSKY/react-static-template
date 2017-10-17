import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "redux/modules/counter";

export default combineReducers({
	router: routerReducer,
	counter
});
