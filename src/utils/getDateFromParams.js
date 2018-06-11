function getDateFromParams(...args) {
	const a = [...args].filter(x => !!x);
	if (!a[0]) return null;

	return a.join('/');
}


export default getDateFromParams;
