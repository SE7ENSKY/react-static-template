// import 'raf/polyfill'; // requestAnimationFrame polyfill
// import 'intersection-observer'; // IntersectionObserver polyfill
// import 'whatwg-fetch'; // Fetch polyfill
// import 'element-closest'; // #Element.closest polyfill
// import 'smoothscroll-polyfill'; // Smooth Scroll behavior polyfill
import React from 'react';
import { render } from 'react-dom';
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import App from 'containers/AppContainer';
import 'normalize.css/normalize.css';
import 'styles/main.styl';


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

// need browser extension
// if (__DEV__) {
// 	const registerObserver = require('react-perf-devtool');
// 	registerObserver();
// }
