import {
	INCREMENT_REQUESTED,
	INCREMENT,
	DECREMENT_REQUESTED,
	DECREMENT
} from "store/constants";
import { fromJS } from "immutable";

export const increment = () =>
	(dispatch) => {
		dispatch({
			type: INCREMENT_REQUESTED
		});
		dispatch({
			type: INCREMENT
		});
	};

export const incrementAsync = () =>
	(dispatch) => {
		dispatch({
			type: INCREMENT_REQUESTED
		});
		return setTimeout(() => {
			dispatch({
				type: INCREMENT
			});
		}, 500);
	};

export const decrement = () =>
	(dispatch) => {
		dispatch({
			type: DECREMENT_REQUESTED
		});
		dispatch({
			type: DECREMENT
		});
	};

export const decrementAsync = () =>
	(dispatch) => {
		dispatch({
			type: DECREMENT_REQUESTED
		});
		return setTimeout(() => {
			dispatch({
				type: DECREMENT
			});
		}, 500);
	};


const initialState = fromJS({
	count: 0,
	isIncrementing: false,
	isDecrementing: false
});

const actionHandlers = {
	[INCREMENT_REQUESTED]: state =>
		state.set("isIncrementing", true),
	[INCREMENT]: state =>
		state
			.update("count", v => v + 1)
			.set("isIncrementing", false),
	[DECREMENT_REQUESTED]: state =>
		state.set("isDecrementing", true),
	[DECREMENT]: state =>
		state
			.update("count", v => v - 1)
			.set("isDecrementing", false)
};

function reducer(state = initialState, action) {
	const handler = actionHandlers[action.type];
	return handler ? handler(state, action) : state;
}

const actionCreators = {
	increment,
	incrementAsync,
	decrement,
	decrementAsync
};

export { actionCreators, actionHandlers };

export default reducer;
