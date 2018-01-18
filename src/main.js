import React from 'react';
import { render } from 'react-dom';
// import 'whatwg-fetch';
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import App from 'containers/AppContainer';


function initRender() {
	render(
		<App />,
		document.querySelector('#app')
	);
}

initRender();

if (module.hot) {
	module.hot.accept('containers/AppContainer', () => initRender());
}

// if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
// 	OfflinePluginRuntime.install();
// }
