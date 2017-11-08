/**
	Return operation system name
*/

export default () => {
	if (navigator.appVersion.indexOf('Win') !== -1) return 'Windows';
	if (navigator.appVersion.indexOf('Mac') !== -1) return 'MacOS';
	if (navigator.appVersion.indexOf('X11') !== -1) return 'UNIX';
	if (navigator.appVersion.indexOf('Linux') !== -1) return 'Linux';
	return null;
};
