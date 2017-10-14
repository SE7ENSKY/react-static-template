import React from "react";
import {
	Route,
	Link
} from "react-router-dom";
import CoreLayout from "layouts/CoreLayout";
import Home from "components/Home";
import About from "components/About";


const App = () => (
	<div>
		<header>
			<Link to="/">Home</Link>
			<Link to="/about-us">About</Link>
		</header>

		<CoreLayout>
			<Route
				exact
				path="/"
				component={Home}
			/>
			<Route
				exact
				path="/about-us"
				component={About}
			/>
		</CoreLayout>
	</div>
);

export default App;
