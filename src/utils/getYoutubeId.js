const YOUTUBE_REGEX = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

export default (src) => {
	if (YOUTUBE_REGEX.test(src)) {
		return src.match(YOUTUBE_REGEX)[1];
	}
	return null;
};
