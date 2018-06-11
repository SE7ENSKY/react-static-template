export default (duration) => {
	const seconds = duration % 60;
	const withoutSeconds = Math.floor(duration / 60);
	const hours = Math.floor(withoutSeconds / 60);
	const minutes = withoutSeconds - (hours * 60);

	return {
		hours: hours < 9 ? `0${hours}` : hours,
		minutes: `0${minutes}`.substr(-2),
		seconds: `0${seconds}`.substr(-2),
	};
};
