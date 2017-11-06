import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import App from 'containers/App';

function initRender() {
	render(
		<AppContainer>
			<App />
		</AppContainer>,
		document.querySelector('#app')
	);
}

initRender();

if (module.hot) {
	module.hot.accept('containers/App', () => initRender());
}

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
	OfflinePluginRuntime.install();
}
