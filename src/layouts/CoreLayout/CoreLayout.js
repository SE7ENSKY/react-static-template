import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import Home from "routes/Home";
import About from "routes/About";
import "normalize.css/normalize.css";
import "styles/main.styl";

const CoreLayout = () => (
	<div className="app">
		<Header />
		<div className="main">
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/about-us" component={About} />
			</Switch>
		</div>
		<Footer />
	</div>
);

export default CoreLayout;
