/**
 * Redux middleware to handle API errors
 * Add after your middleware with API calls
 */
export default ({ dispatch }) => next => (action) => {
	const { payload, error } = action;

	if (error && payload && payload.name === 'ApiError') {
		const { status } = payload;

		if (status === 401) {
			// handle Unauthorized error
		}

		if (status === 404) {
			// handle Not Found error
		}

		if (status === 500) {
			// handle Internal Server Error
		}
	}

	return next(action);
};
