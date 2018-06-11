/**
	shim for toJS method of immutable.js
*/

export default (immutableObj) => {
	try {
		return immutableObj.toJS();
	} catch (e) {
		return null;
	}
};
