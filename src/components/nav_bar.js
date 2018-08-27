import React, { Component } from 'react';
import { Navbar, NavItem} from 'react-materialize';

class NavBar extends Component {

	render() {
		return (
			<Navbar className = 'black' fixed = {true} brand = '<GDJ/>' right>
				<NavItem>Saved</NavItem>
			</Navbar>
		);
	}
}

export default NavBar;



