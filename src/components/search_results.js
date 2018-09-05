import React, { Component } from 'react';
import './search_results.css';
import NavBar from './nav_bar';
import Card from './single_card';
import Filters from './filters';
import { Button, SideNav,SideNavItem } from 'react-materialize';
import {FaEllipsisV} from 'react-icons/fa';
import {formatPostData} from "../helpers";
import axios from 'axios';

class SearchResults extends Component {
	constructor(props){
		super(props);

		this.state = {
			left: '',
			right: '',
			response: [] 
		}
	}

	async componentDidMount(){
		await this.getJobData();
		this.populateCards(this.state.response.data.jobs);
	}

	getFilterResponseData(respObj){
		this.setState({
			response: respObj
		})
		this.populateCards(this.state.response.data.jobs);
	}
	
	async getJobData(){
		console.log("page 2 props", this.props)
		const {city, job} = this.props.match.params;
        event.preventDefault();   //will need to address isue with backend about querys accounting for spaces or no spaces
		const initialSearchParams = {
            title: 'web developer', 
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
            userLat:'',
            userLng:'',
        }	
		const params = formatPostData(initialSearchParams);
		const resp = await axios.post("http://localhost:8000/api/get_joblist.php", params); 
		this.setState({response:resp})		   
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
			<div className = 'main-cont'>
					<NavBar/>
					<SideNav
				  	trigger = {<Button className ="black sideTrigger"><FaEllipsisV/>Filters</Button>}
				  	options={{closeOnClick:true}}
					>
						<SideNavItem>
							<Filters getFilterData = {this.getFilterResponseData.bind(this)} job={this.props.match.params.job} city={this.props.match.params.city}/>
						</SideNavItem>
					</SideNav>
				<div className = 'cardArea'>
                   	<div className='leftColumn'>
	                    {this.state.left}
	                </div>    
                	<div className='rightColumn'>
						{this.state.right}
                	</div>
                </div>	
			</div>
		);
	}
}


export default SearchResults;




