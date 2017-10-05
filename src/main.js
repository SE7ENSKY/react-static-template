import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createStore from './store/createStore';
import App from './containers/App';
import 'normalize.css/normalize.css';
import 'styles/main.styl';

const store = createStore();
const MOUNT_NODE = document.querySelector('#app');

function initRender() {
	render(
		<AppContainer>
			<App store={store} />
		</AppContainer>,
		MOUNT_NODE
	);
}

initRender();

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('containers/App', () => initRender());
}
