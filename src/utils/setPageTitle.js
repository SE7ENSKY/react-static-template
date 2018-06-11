export default (title) => {
	if (!title) {
		document.title = 'YABL';
	} else {
		document.title = `${title} – YABL`;
	}
};
