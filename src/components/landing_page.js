import React, { Component } from 'react';
import './landing_page.css';
import { Link } from 'react-router-dom';
import {Input, Col} from 'react-materialize';
import {connect} from 'react-redux';
import {setTheme} from '../actions';
import ThemeDropDown from './theme_dropdown.js';

class LandingPage extends Component {
	constructor(props){
		super(props);

		this.state = {
			title: 'Web Developer',
			location: 'Irvine',
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	handleInputChange(event){
		const {name, value} = event.target;
		this.setState({
			[name]: value
		});
	}
	// Get users current location on Landing Page to enable search by Distance
	componentDidMount(){
		this.props.setTheme(this.props.theme.current);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
			  var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			  }; 
			})
		}
	}
	
	render() {
		let {title, location} = this.state;
		let locationLow = location.toLowerCase().split(' ').join('');
		let titleNoSpace = title.toLowerCase().split(' ').join('');
		let linkQuery = 'listings/' + titleNoSpace + '/' + locationLow;
		
		return (
				<div className ={`body-container ${this.props.theme.navColor}`}>
					<div className ={`left-numbers ${this.props.theme.text2}`}>
			            <div className="left-nums">01</div>
			            <div className="left-nums">02</div>
			            <div className="left-nums">03</div>
			            <div className="left-nums">04</div>
			            <div className="left-nums">05</div>
			            <div className="left-nums">06</div>
			            <div className="left-nums">07</div>
			            <div className="left-nums">08</div>
			            <div className="left-nums">09</div>
			            <div className="left-nums">10</div>
			            <div className="left-nums">11</div>
			            <div className="left-nums">12</div>
			            <div className="left-nums">13</div>
			            <div className="left-nums">14</div>
			            <div className="left-nums">15</div>
			            <div className="left-nums">16</div>
			            <div className="left-nums">17</div>
			            <div className="left-nums">18</div>
			            <div className="left-nums">19</div>
			            <div className="left-nums">20</div>
			            <div className="left-nums">21</div>
			            <div className="left-nums">22</div>
			            <div className="left-nums">23</div>
			            <div className="left-nums">24</div>
			            <div className="left-nums">25</div>
			            <div className="left-nums">26 <span className ={this.props.theme.text2}>&lt;a href = &quot;/about-us&quot;&gt;<Link to ="/about-us" className = {this.props.theme.titleText1}>About Us</Link>&lt;/a&gt;</span></div>
			            <div className="left-nums">27</div>
			            <div className="left-nums">28</div>
			            <div className="left-nums">29</div>
			            <div className="left-nums">31</div>
			            <div className="left-nums">32</div>
			            <div className="left-nums">33</div>
			            <div className="left-nums">34</div>
			            <div className="left-nums">35</div>
			            <div className="left-nums">36</div>
			            <div className="left-nums">37</div>
			            <div className="left-nums">38</div>
			            <div className="left-nums">39</div>
			            <div className="left-nums">41</div>
			            <div className="left-nums">42</div>
			            <div className="left-nums">43</div>
			            <div className="left-nums">44</div>
			            <div className="left-nums">45</div>
			            <div className="left-nums">46</div>
			            <div className="left-nums">47</div>
			            <div className="left-nums">48</div>
			            <div className="left-nums">49</div>
			            <div className="left-nums">50</div>
		        	</div>
		        	<div className = {`lp-button-syntax ${this.props.theme.text2}`}>&lt;button type = &quot;button&quot; class = &quot;btn drop-down&quot;&gt;</div>
		        	<div className = 'lp-theme-cont'>
			            <div className = {`lp-drop-content ${this.props.theme.titleText1}`}>
							<ThemeDropDown/>
                        </div>
                        <div className = {`lp-button-syntax ${this.props.theme.text2}`}>&lt;/button&gt;</div>  
                    </div>
			        <div className ='container input-container'>
			            <h1 className={`center-align lp-title ${this.props.theme.titleText1}`}>getDevJob(<span className = {this.props.theme.titleText2}>you</span>)</h1>
			            <form className = 'lp-form '>
			                <div className ='row '> 
			                    <Col s={12} m={8} l={6} offset="s1 m2 l3">
									<Input s={11} m={10} l={6} type ='select' label = 'Job Title' name="title" defaultValue = 'Web Developer' className = {this.props.theme.text1} onChange={this.handleInputChange.bind(this)}>
                                		<option value = 'Web Developer'> Web Developer</option>
                                		<option value = 'Front End'> Front End</option>
                                		<option value = 'Back End'> Back End</option>
                       				</Input>
									<Input s={11} m={10} l={6} type ='select' label = 'City' name="location" defaultValue = 'Irvine' className = {this.props.theme.text1} onChange={this.handleInputChange.bind(this)}>
                                		<option value = 'Irvine'>Irvine</option>
                                		<option value = 'San Diego'>San Diego</option>
                                		<option value = 'Los Angeles'>Los Angeles</option>
                       				</Input>
			                    </Col>
			                </div>
			                <div className='row'>
			                	<Link to ={linkQuery} className = {`btn col s2 offset-s5 waves-effect waves-light ${this.props.theme.button}`}><span className = {this.props.theme.buttonText}>Go</span>	                		
			                    </Link>	
			                </div>
			            </form>    
			        </div>    
				</div>	
		);
	}
}
function mapStateToProps( state ){
	return{
		theme: state.theme.theme,
		}
}

export default connect(mapStateToProps,{ setTheme })(LandingPage);