import getOSName from './getOSName';

export default (phone) => {
	const os = getOSName();

	if (os === 'MacOS') return `facetime:${phone}`;

	return `tel:${phone}`;
};
