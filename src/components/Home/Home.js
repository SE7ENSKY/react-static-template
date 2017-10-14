import React from "react";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	increment,
	incrementAsync,
	decrement,
	decrementAsync
} from "reducers/counter";
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

const mapStateToProps = state => ({
	count: state.counter.count,
	isIncrementing: state.counter.isIncrementing,
	isDecrementing: state.counter.isDecrementing
});

const mapDispatchToProps = dispatch => bindActionCreators({
	increment,
	incrementAsync,
	decrement,
	decrementAsync,
	changePage: () => push("/about-us")
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
