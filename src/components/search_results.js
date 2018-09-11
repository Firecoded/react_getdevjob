import React, { Component } from 'react';
import './search_results.css';
import NavBar from './nav_bar';
import Card from './single_card';
import Filters from './filters';
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
		$('.side-nav-control').sideNav();
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
				if(localStorage.getItem('theme')){
					console.log("THEME ITEM",localStorage.getItem('theme'));
					this.props.setTheme(localStorage.getItem('theme'));
				} else {
					console.log("No THEME SET", this.props.theme.current);
				this.props.setTheme(this.props.theme.current);
				}
			});
		} else {
			console.log(" did Not Get location Data");
				await this.getJobData(NaN, NaN);
				this.populateCards(this.state.response.data.jobs);
				if(localStorage.getItem('theme')){
					console.log("THEME ITEM",localStorage.getItem('theme'));
					this.props.setTheme(localStorage.getItem('theme'));
				} else {
					console.log("No THEME SET", this.props.theme.current);
				this.props.setTheme(this.props.theme.current);
				}
		}	
	}


	getFilterResponseData(respObj){
		if(!this.state.response.data.success){
			this.setState({
				loaded: false
			})
			console.log('Filter response false', this.state.response.data.success)
			return;

		}
		this.setState({
			response: respObj,
			loaded: true
		})

		console.log('get filter resp data respObj', respObj)

		this.populateCards(this.state.response.data.jobs);
	}

	//returns modified title in format we need to send to backend 
	handleTitle(title){
        const titleObj = {
			"frontend": "Front End", 
        	"backend": "Back End", 
			"webdeveloper": "Web Developer"
		};
        return titleObj[title];     
	}

	async getJobData(userLat , userLng){
		const {city, job} = this.props.match.params;
		let refinedJob = this.handleTitle(job);
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
		if(array.length < 1){
			return;
		}		
		let alt = 1;
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

	openSideNav(){
		$('.side-nav-control').sideNav('show');
	}

	render() {
		return (
			<div className = 'parent-div'>
				<div className = 'spacer-div'></div>
				<div className = {`main-cont ${this.props.theme.background}`}>
						<NavBar/>
						<div onClick={this.openSideNav} className="side-nav-control" data-activates="filterSideNav" className ={`sideTrigger ${this.props.theme.navColor} ${this.props.theme.text1}`}><FaEllipsisV/>Filters</div>
						<ul id="filterSideNav" className={`side-nav ${this.props.theme.titleText1} ${this.props.theme.navColor}`}>
							<li>
								<Filters getFilterData = {this.getFilterResponseData.bind(this)} job={this.props.match.params.job} city={this.props.match.params.city}/>
							</li>
						</ul>
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




