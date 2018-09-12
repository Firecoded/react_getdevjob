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
import BottomScrollListener from 'react-bottom-scroll-listener';
import NoResults from './no-results';

class SearchResults extends Component {
	constructor(props){
		super(props);

		this.state = {
			left: '',
			right: '',
			response: [],
			nextResults: [],
			loaded: false,
			noResults: false
		}
		this.searchParams;
		this.offset = 0;
		this.leftArray =[];
		this.rightArray =[];
		this.lat = NaN;
		this.lng = NaN;
		this.alt = 1;
	}

	async componentDidMount(){
		const {city, job} = this.props.match.params;
		let refinedJob = this.handleTitle(job);
		let refinedCity = this.handleCity(city);
		this.offset = 0;
		$('.side-nav-control').sideNav();
		if (Object.keys(navigator.geolocation).length) {
            navigator.geolocation.getCurrentPosition(async (position) => {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};				
				this.lat = pos.lat;
				this.lng = pos.lng;
				this.searchParams = {
		            title: refinedJob, 
					location: refinedCity,
					id:'',
		            minSalary:'',
		            maxSalary:'',
		            distance:30,
		            experience:'',
		            postedDate:'',
		            employmentTypeContract: false,
		            employmentTypeInternship: false,
		            employmentTypePartTime: false,
		            employmentTypeFullTime: false,
		            userLat:this.lat,
		            userLng:this.lng,
		            offset: 0
		        }
				await this.getJobData(0, this.searchParams);
				this.populateCards(this.state.response.data.jobs);
				if(localStorage.getItem('theme')){
					this.props.setTheme(localStorage.getItem('theme'));
				} else {
					this.props.setTheme(this.props.theme.current);
				}
			});
		} else {
			console.log(" did Not Get location Data");
			this.lat = NaN;
			this.lng = NaN;
			this.searchParams = {
	            title: refinedJob, 
				location: refinedCity,
				id:'',
	            minSalary:'',
	            maxSalary:'',
	            distance:45,
	            experience:'',
	            postedDate:'',
	            employmentTypeContract: false,
	            employmentTypeInternship: false,
	            employmentTypePartTime: false,
	            employmentTypeFullTime: false,
	            userLat: this.lat,
	            userLng: this.lng,
	            offset: this.offset
	        }
			await this.getJobData(0, this.searchParams);
			this.populateCards(this.state.response.data.jobs);
			if(localStorage.getItem('theme')){
				this.props.setTheme(localStorage.getItem('theme'));
			} else {
				this.props.setTheme(this.props.theme.current);
			}
		}	
	}


	getFilterResponseData(respObj, searchParams){
		console.log('got from filters', searchParams)
		this.searchParams = searchParams;
		console.log('respObj', respObj)
		if(!respObj.data.success){
			this.leftArray =[];
			this.rightArray =[];
			this.offset = 0;
			this.alt = 1;
			this.setState({
				noResults: true,
				left: '',
				right: ''
			})
			console.log('Filter response false', this.state.response.data.success)
			return;
		}
		this.setState({
			response: respObj,
			loaded: true,
			left: '',
			right: '',
			noResults: false
		})
		console.log('get filter resp data respObj', respObj)
		this.leftArray =[];
		this.rightArray =[];
		this.offset = 0;
		this.alt = 1;
		this.searchParams.offset = this.offset
		console.log("from filters before populate", this.searchParams)
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

	handleCity(city){
		const cityObj = {
			"losangeles": "Los Angeles",
            "sandiego": "San Diego",
            "irvine": "Irvine"
		};
        return cityObj[city];    
	}

	async getJobData(offset, searchParams){
		if(event){
			event.preventDefault();   //will need to address isue with backend about querys accounting for spaces or no spaces
		}
		
        console.log('search results page params', searchParams)
		const params = formatPostData(searchParams);
		const resp = await axios.post("/api/get_joblist.php", params);
		this.setState({response:resp, loaded: true})	   
    }

    mathRand(){
    	return Math.floor(Math.random()*10000)
    }

	populateCards(array){
		if(array.length < 1){
			this.leftArray =[];
			this.rightArray =[];
			this.setState({
				noResults: true,
				left: '',
				right: ''
			})
			return;
		}		
		for (var index=0; index < array.length; index++){
			if(this.alt){
				let temp = <Card key = {this.mathRand() +'o'+ index} pullId = {(this.offset * 12) + index} details = {array[index]}{...this.props} />
				this.leftArray.push(temp);
				this.alt = 1 - this.alt;
			} else {
				let temp = <Card key = {this.mathRand() +'o'+ index} pullId = {(this.offset * 12) + index} details = {array[index]}{...this.props} />
				this.rightArray.push(temp);
				this.alt = 1 - this.alt;
			}
		}
		this.setState({
			left: this.leftArray,
			right: this.rightArray,
			noResults: false
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
					
					<div className = 'cardArea'>
	                   	<div className='leftColumn'>
		                    {this.state.left}
		                </div>    
	                	<div className='rightColumn'>
							{this.state.right}
	                	</div>
	                	<div className = "load-cont" style = {!this.state.loaded && this.offset<1 ? {} : {'display':'none'} }>						
							{!this.state.loaded && this.offset < 1 ? <Loading/> : '' }
						</div>
						<div className = "load-cont2" style = {!this.state.loaded && this.offset>0 ? {} : {'display':'none'} }>						
							{!this.state.loaded && this.offset > 0 ? <Loading/> : '' }
						</div>
						{this.state.noResults ? <NoResults/> : ''}
	                	<BottomScrollListener offset = {200} onBottom = {async ()=>{
	                		this.offset += 1;
	                		this.searchParams.offset=this.offset;
	                		this.setState({loaded: false})
	                		await this.getJobData(this.offset, this.searchParams);
	                		this.populateCards(this.state.response.data.jobs)
	                	}}/>
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




