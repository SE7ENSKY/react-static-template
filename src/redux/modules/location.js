import browserHistory from "react-router/lib/browserHistory";
import { LOCATION_CHANGE } from 'store/constants';

export function locationChange(location = "/") {
	return {
		type: LOCATION_CHANGE,
		payload: location
	};
}

export const updateLocation = ({ dispatch }) => nextLocation =>
	dispatch(locationChange(nextLocation));

const initialState = browserHistory.getCurrentLocation();
const reducer = (state = initialState, action) => (
	action.type === LOCATION_CHANGE ? action.payload : state
);

export default reducer;
