import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { AppContainer } from "react-hot-loader";
import store, { history } from "store/createStore";
import App from "containers/App";
import "normalize.css/normalize.css";
import "styles/main.styl";


function initRender() {
	render(
		<AppContainer>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<App />
				</ConnectedRouter>
			</Provider>
		</AppContainer>,
		document.querySelector("#app")
	);
}

initRender();

if (module.hot) {
	module.hot.accept("containers/App", () => initRender());
}
