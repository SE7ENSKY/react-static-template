import React from 'react';
import MediaQuery from 'react-responsive';
import { MIN_DESKTOP_WIDTH, MIN_TABLET_WIDTH } from 'store/constants';


const Desktop = props => <MediaQuery minWidth={MIN_DESKTOP_WIDTH} {...props} />;
const Tablet = props => (
	<MediaQuery
		minWidth={MIN_TABLET_WIDTH}
		maxWidth={MIN_DESKTOP_WIDTH - 1}
		{...props}
	/>
);
const Mobile = props => <MediaQuery maxWidth={MIN_TABLET_WIDTH - 1} {...props} />;
const TabletDesktop = props => <MediaQuery minWidth={MIN_TABLET_WIDTH} {...props} />;
const MobileTablet = props => <MediaQuery maxWidth={MIN_DESKTOP_WIDTH - 1} {...props} />;

export {
	Desktop,
	Tablet,
	Mobile,
	TabletDesktop,
	MobileTablet
};
