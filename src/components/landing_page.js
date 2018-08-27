import React, { Component } from 'react';
import './landing_page.css';
import { Link } from 'react-router-dom';
import {Input} from 'react-materialize';

class LandingPage extends Component {
	constructor(props){
		super(props);

		this.state = {
			title: 'Web Developer',
			location: 'Irvine'
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	handleInputChange(event){
		const {name, value} = event.target;
		this.setState({
			[name]: value
		});
	}
	render() {
		let {title, location} = this.state;
		let locationLow = location.toLowerCase().split(' ').join('');
		let titleNoSpace = title.toLowerCase().split(' ').join('');
		let linkQuery = titleNoSpace + '/' + locationLow;
		
		
		return (
				<div className ='body-container'>
					<div className ="left-numbers">
			            <div className="left-nums">01 &lt;body&gt;</div>
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
			            <div className="left-nums">26</div>
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
			        <div className ='container input-container'>
			            <h1 className="center-align title blue-txt ">getDevJob(<span className = 'orange-txt'>you</span>)</h1>
			            <form className = 'lp-form '>
			                <div className ='row '> 
			                    <div className='input-field col offset-l3 offset-m2 l6 m6 s6 '>
									<Input s={6} type ='select' label = 'Job Title' name="title" defaultValue = 'Web Developer' className = "white-text" onChange={this.handleInputChange.bind(this)}>
                                		<option value = 'Web Developer'> Web Developer</option>
                                		<option value = 'Front End'> Front End</option>
                                		<option value = 'Back End'> Back End</option>
                       				</Input>
									{/* <input type='text' className ="autocomplete white-text" name = 'title' onChange = {this.handleInputChange}placeholder='Job Title '/> */}
									<Input s={6} type ='select' label = 'City' name="location" defaultValue = 'Irvine' className = "white-text" onChange={this.handleInputChange.bind(this)}>
                                		<option value = 'Irvine'>Irvine</option>
                                		<option value = 'San Diego'>San Diego</option>
                                		<option value = 'Los Angeles'>Los Angeles</option>
                       				</Input>
			                    </div>
			                </div>
			                <div className='row'>
			                	<Link className = "btn orange darken-4 col s2 offset-s5 waves-effect waves-light"to ={linkQuery}>Go	                		
			                    </Link>	
			                </div>
			            </form>
			        </div>    
				</div>	
		);
	}
}

export default LandingPage;