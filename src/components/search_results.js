import React, { Component } from 'react';
import './search_results.css';
import NavBar from './nav_bar';
import Card from './single_card';
import Filters from './filters';
import {SideNav,SideNavItem } from 'react-materialize';
import {FaEllipsisV} from 'react-icons/fa';
import {formatPostData} from "../helpers";
import axios from 'axios';
import {connect} from 'react-redux';
import {setTheme} from '../actions';
import Loading from './loading';

class SearchResults extends Component {
	constructor(props){
		super(props);

		this.state = {
			left: '',
			right: '',
			response: [],
			loaded: false
		}
	}

	async componentDidMount(){
		if (Object.keys(navigator.geolocation).length) {
			console.log("Get location Data");
            navigator.geolocation.getCurrentPosition(async (position) => {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};				
				let {lat,lng} = pos;
				await this.getJobData(lat, lng);
				this.populateCards(this.state.response.data.jobs);
				this.props.setTheme(this.props.theme.current);
			});
		} else {
			console.log(" did Not Get location Data");
				await this.getJobData(NaN, NaN);
				this.populateCards(this.state.response.data.jobs);
				this.props.setTheme(this.props.theme.current);
		}	
	}

	
	handleTitle(title){
		let titleObj = {
			"frontend": "Front End", 
			"backend": "Back End",
			"webdeveloper": "Web Developer"
		};
		return titleObj[title];
    }

	getFilterResponseData(respObj){
		this.setState({
			response: respObj
		})
		this.populateCards(this.state.response.data.jobs);
	}
	
	async getJobData(userLat , userLng){
		const {city, job} = this.props.match.params;
		let refinedJob = this.handleTitle(job);
		console.log('refinded', refinedJob);
		if(event){
			event.preventDefault();   //will need to address isue with backend about querys accounting for spaces or no spaces
		}
		const initialSearchParams = {
            title: refinedJob, 
			location: city,
			id:'',
            minSalary:'',
            maxSalary:'',
            distance:'',
            experience:'',
            postedDate:'',
            employmentTypeContract: false,
            employmentTypeInternship: false,
            employmentTypePartTime: false,
            employmentTypeFullTime: false,
            userLat:userLat,
            userLng:userLng,
        }	
		const params = formatPostData(initialSearchParams);
		const resp = await axios.post("/api/get_joblist.php", params); 
		this.setState({response:resp, loaded: true})		   
    }

	populateCards(array){
		
		let alt = 0;
		let leftArray =[];
		let rightArray =[];
		for (var index=0; index < array.length; index++){
			if(alt){
				let temp = <Card key = {index} pullId = {index} details = {this.state.response.data.jobs[index]}{...this.props} />
				leftArray.push(temp);
				alt = 1-alt;
			} else {
				let temp = <Card key = {index} pullId = {index} details = {this.state.response.data.jobs[index]}{...this.props} />
				rightArray.push(temp);
				alt = 1-alt;
			}
		}
		this.setState({
				left:leftArray,
				right: rightArray
		})
	}

	render() {
		return (
			<div className = 'parent-div'>
				<div className = 'spacer-div'></div>
				<div className = {`main-cont ${this.props.theme.background}`}>
						<NavBar/>
						<SideNav
					  		trigger = {<div className ={`sideTrigger ${this.props.theme.navColor} ${this.props.theme.text1}`}><FaEllipsisV/>Filters</div>}
					  		options={{closeOnClick:true}}
						>
							<SideNavItem>
							  <Filters getFilterData = {this.getFilterResponseData.bind(this)} job={this.props.match.params.job} city={this.props.match.params.city}/>
							</SideNavItem>
						</SideNav>	
					<div className = "load-cont" style = {this.state.loaded ? {'display':'none'} : {} }>						
						{!this.state.loaded ? <Loading/> : '' }
					</div>
					<div className = 'cardArea'>
					
	                   	<div className='leftColumn'>
		                    {this.state.left}
		                </div>    
	                	<div className='rightColumn'>
							{this.state.right}
	                	</div>
	                </div>	
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

export default connect(mapStateToProps,{ setTheme })(SearchResults);




