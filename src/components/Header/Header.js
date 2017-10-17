import React from 'react';
import { Link } from 'react-router-dom';
import './Header.styl';

const Header = () => (
	<header className="header">
		<Link to="/">Home</Link>
		<Link to="/about-us">About</Link>
	</header>
);

export default Header;
