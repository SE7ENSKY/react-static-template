/**
* Polyfill to closest (https://developer.mozilla.org/ru/docs/Web/API/Element/closest)
*/

export default (node, selector) => {
	while (node) {
		if ([...node.classList].indexOf(selector) !== -1) return node;
		node = node.parentNode;
	}
	return null;
};
