import moment from 'moment';

export default (arr, fieldName) => arr.sort(
	(d1, d2) => moment(d1[fieldName]).diff(d2[fieldName])
);
