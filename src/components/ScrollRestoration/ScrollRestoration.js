import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
	arrayOf,
	oneOfType,
	element,
	node,
	objectOf,
	any
} from 'prop-types';


class ScrollRestoration extends Component {
	static propTypes = {
		location: objectOf(any).isRequired,
		children: oneOfType([element, arrayOf(element), node]).isRequired
	};

	componentDidUpdate(prevProps) {
		const { location } = this.props;
		if (location !== prevProps.location) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		const { children } = this.props;
		return (children);
	}
}

export default withRouter(ScrollRestoration);
