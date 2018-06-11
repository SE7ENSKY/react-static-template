export default () => {
	if (window.fbq) window.fbq('track', 'PageView');
	if (window.gtag) {
		window.gtag('config', 'UA-115318825-1', {
			page_location: window.location.href,
		});
	}
};
