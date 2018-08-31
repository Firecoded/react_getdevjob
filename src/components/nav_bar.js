import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Input, Col} from 'react-materialize';
import './nav_bar.css';
import {connect} from 'react-redux';
import {setTheme} from '../actions';


class NavBar extends Component {
	constructor(props){
		super(props)

		this.state = {
			theme: 'light',
			dropStyle: 'nb-drop-content'
		}
	}
	componentDidMount(){
		console.log("Props yo" ,this.props);
		this.props.setTheme('light');
	}
	handleInputChange(event){
		event.preventDefault();
		const {value} = event.target;
		this.setState({
			theme: value,
		});
		this.nextTheme = this.props.theme === 'light'? 'dark':'light';
		this.props.setTheme(this.nextTheme);
		this.dropMenu();
	}
	dropMenu(){
		if(this.state.dropStyle === 'nb-drop-content' || this.state.dropStyle === 'hidden nb-drop-content'){
			this.setState({
			dropStyle: 'shown nb-drop-content'
			})
		} else {
			this.setState({
			dropStyle: 'hidden nb-drop-content'
		})
		}
		
	}
	render() {
		console.log(this.props);
		return (
			<nav className = {`top-nav ${this.props.navColor} ${this.props.textColor}`}>
				<div className = 'nav-wrapper'>
					<Link to = '/' className = 'brand-logo tn-logo'>&lt;gDJ/&gt;</Link>
					<ul className = 'right nav-bar-items'>
						<li onClick = {this.dropMenu.bind(this)} className = 'tn-theme row btn black white-text'>
							Change Theme	
						</li>
						<div className = {this.state.dropStyle}>
							<Input s={12} type ='select' label = 'Job Title' name="title" defaultValue = 'Web Developer' onChange={this.handleInputChange.bind(this)}>
	                            <option value = 'dark'> Dark Theme</option>
	                            <option value = 'light'> White as John Theme</option>
	                            <option value = 'Poop Brown'> Poop Brown Theme</option>
	                        </Input>
                        </div>
					</ul>	
				</div>
			</nav>
		);
	}
}

function mapStateToProps( state ){
	console.log("Look at me!!!!!!", state.theme.themeName);
	return{
		
		theme: state.theme.themeName,
		navColor: state.theme.theme.navColor,
		// textColor: state.themes.text
		}
}

export default connect(mapStateToProps,{ setTheme })(NavBar);




