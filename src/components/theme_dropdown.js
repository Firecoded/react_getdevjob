import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setTheme} from '../actions';
import {Input, Col} from 'react-materialize';
import "./theme-dropdown.css";

class ThemeDropDown extends Component {
	constructor(props){
		super(props)

		this.state = {
			theme: 'light',
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
	}
	render() {
		return (
			<div className = {` theme-dropdown ${this.props.theme.titleText1} ${this.props.theme.navColor}`}>	
				<Input s={12} type ='select'  name="theme" defaultValue = {this.props.theme.current} onChange={this.handleInputChange.bind(this)}>
	                <option value = 'dark'> Dark Theme</option>
	                <option value = 'light'> Light Theme</option>
	                <option value = 'gotham'> Gotham Theme</option>
					<option value = 'panda'> Panda Syntax</option>
	            </Input>
	        </div>    
		);
	}
}
function mapStateToProps( state ){
	return{
		theme: state.theme.theme,
		}
}
export default connect(mapStateToProps,{ setTheme })(ThemeDropDown);