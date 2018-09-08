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
		this.props.setTheme(this.props.theme.current);
	}
	handleInputChange(event){
		event.preventDefault();
		const {value} = event.target;
		this.setState({
			theme: value,
		});
		this.props.setTheme(value);
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
		return (
			<nav className = {`top-nav ${this.props.theme.navColor} ${this.props.theme.text1}`}>
				<div className = 'nav-wrapper'>
					<Link to = '/' className = {`brand-logo tn-logo ${this.props.navColor}`}><span className={this.props.theme.titleText1}>&lt;gDJ</span><span className = {this.props.theme.titleText2}>/</span><span className = {this.props.theme.titleText1}>&gt;</span></Link>
					<ul className = 'right nav-bar-items'>
						<li onClick = {this.dropMenu.bind(this)} className = {`tn-theme row btn ${this.props.theme.navColor} ${this.props.theme.text1}`}>
							Change Theme	
						</li>
						<div className = {this.state.dropStyle}>
							<Input s={12} type ='select' label = 'Job Title' name="title" defaultValue = 'Web Developer' onChange={this.handleInputChange.bind(this)}>
	                            <option value = 'dark'> Dark Theme</option>
	                            <option value = 'light'> Light Theme</option>
	                            <option value = 'gotham'> Gotham Theme</option>
								<option value = 'panda'> Panda Syntax</option>
	                        </Input>
                        </div>
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




