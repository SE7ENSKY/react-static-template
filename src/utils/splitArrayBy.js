export default (arr, count) => {
	const responseArr = [];
	const groupsCount = Math.floor(arr.length / count) + 1;

	for (let i = 0; i < groupsCount; i += 1) {
		responseArr.push(arr.slice(i * count, (i + 1) * count));
	}

	return responseArr;
};
