/*
 * @params arr - Array of two elements, [min, max]
 * @params coef - Number, use to calculate value between, like in vector
 */

export default (arr, coef) => {
	if (!Array.isArray(arr) || arr.length < 2) return null;

	return arr[0] + ((arr[1] - arr[0]) * coef);
};
