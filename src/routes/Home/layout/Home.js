import React from 'react';
import {
	number,
	func,
	bool
} from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { actionCreators } from 'reducers/modules/counter';
import './Home.styl';


function Home(props) {
	return (
		<div>
			<h1>Home</h1>
			<p>Count: {props.count}</p>
			<p>
				<button
					onClick={props.increment}
					disabled={props.isIncrementing}
				>
					Increment
				</button>
				<button
					onClick={props.incrementAsync}
					disabled={props.isIncrementing}
				>
					Increment Async
				</button>
			</p>
			<p>
				<button
					onClick={props.decrement}
					disabled={props.isDecrementing}
				>
					Decrementing
				</button>
				<button
					onClick={props.decrementAsync}
					disabled={props.isDecrementing}
				>
					Decrement Async
				</button>
			</p>
			<p>
				<button onClick={() => props.changePage()}>Go to about page via redux</button>
			</p>
		</div>
	);
}

Home.propTypes = {
	count: number.isRequired,
	increment: func.isRequired,
	incrementAsync: func.isRequired,
	decrement: func.isRequired,
	decrementAsync: func.isRequired,
	isIncrementing: bool.isRequired,
	isDecrementing: bool.isRequired,
	changePage: func.isRequired
};

export default connect(state => ({
	count: state.counter.get('count'),
	isIncrementing: state.counter.get('isIncrementing'),
	isDecrementing: state.counter.get('isDecrementing')
}), {
	...actionCreators,
	changePage: () => push('/about-us')
})(Home);
