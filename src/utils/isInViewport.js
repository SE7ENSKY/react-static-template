export default (element, offset = 0) => {
	const rect = element.getBoundingClientRect();
	const html = document.documentElement;

	return (
		rect.bottom >= -offset &&
		rect.left >= 0 &&
		rect.top <= ((window.innerHeight || html.clientHeight) + offset) &&
		rect.right <= (window.innerWidth || html.clientWidth)
	);
};
