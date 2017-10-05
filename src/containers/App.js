import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import routes from "routes/index";

const App = (props) => {
	const { store } = props;

	return (
		<Provider store={store}>
			<Router
				history={browserHistory}
				children={routes(store)}
			/>
		</Provider>
	);
};

App.propTypes = {
	store: PropTypes.objectOf(PropTypes.any).isRequired
};

export default App;
