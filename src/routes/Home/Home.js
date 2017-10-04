import React from 'react';
import { Link } from 'react-router';

const Home = () => (
	<div className="home">
		<div className="text">It is a home page</div>
		<Link to="/content">content</Link>
	</div>
);

export default Home;
