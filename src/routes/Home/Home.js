import React from "react";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { actionCreators } from "redux/modules/counter";
import "./Home.styl";


const Home = props => (
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

Home.propTypes = {
	count: PropTypes.number.isRequired,
	increment: PropTypes.func.isRequired,
	incrementAsync: PropTypes.func.isRequired,
	decrement: PropTypes.func.isRequired,
	decrementAsync: PropTypes.func.isRequired,
	isIncrementing: PropTypes.bool.isRequired,
	isDecrementing: PropTypes.bool.isRequired,
	changePage: PropTypes.func.isRequired
};

export default connect(state => ({
	count: state.counter.get("count"),
	isIncrementing: state.counter.get("isIncrementing"),
	isDecrementing: state.counter.get("isDecrementing")
}), {
	...actionCreators,
	changePage: () => push("/about-us")
})(Home);
