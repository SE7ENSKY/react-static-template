export default (obj) => {
	if (!obj) return null;

	return obj.imageSlider || obj.imageSquare || obj.image;
};
