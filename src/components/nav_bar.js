import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './nav_bar.css';
import {connect} from 'react-redux';
import {setTheme} from '../actions';
import ThemeDropDown from './theme_dropdown.js';


class NavBar extends Component {
	constructor(props){
		super(props)

		this.state = {
			theme: 'light'
		}
	}
	componentDidMount(){
		if(localStorage.getItem('theme')){
			this.props.setTheme(localStorage.getItem('theme'));
		} else {
		this.props.setTheme(this.props.theme.current);
		}
	}

	render() {
		return (
			<nav className = {`top-nav ${this.props.theme.navColor} ${this.props.theme.text1}`}>
				<div className = 'nav-wrapper'>
					<Link to = '/' className = {`brand-logo tn-logo ${this.props.theme.navColor}`}><span className={this.props.theme.titleText1}>&lt;gDJ</span><span className = {this.props.theme.titleText2}>/</span><span className = {this.props.theme.titleText1}>&gt;</span></Link>
					<ul className = {`right nav-bar-items ${this.props.theme.titleText1} ${this.props.theme.navColor}`}>
						<li className = 'nb-drop-content'>
							<ThemeDropDown/>
                        </li>
					</ul>	
				</div>
			</nav>
		);
	}
}

function mapStateToProps( state ){
	return{
		theme: state.theme.theme,
		}
}

export default connect(mapStateToProps,{ setTheme })(NavBar);




