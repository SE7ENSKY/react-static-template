import {
	INCREMENT_REQUESTED,
	INCREMENT,
	DECREMENT_REQUESTED,
	DECREMENT
} from "store/constants";


const initialState = {
	count: 0,
	isIncrementing: false,
	isDecrementing: false
};

export default (state = initialState, action) => {
	switch (action.type) {
	case INCREMENT_REQUESTED:
		return {
			...state,
			isIncrementing: true
		};
	case INCREMENT:
		return {
			...state,
			count: state.count + 1,
			isIncrementing: !state.isIncrementing
		};
	case DECREMENT_REQUESTED:
		return {
			...state,
			isDecrementing: true
		};
	case DECREMENT:
		return {
			...state,
			count: state.count - 1,
			isDecrementing: !state.isDecrementing
		};
	default:
		return state;
	}
};

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
