import React, { Component } from 'react';
import './search_results.css';
import NavBar from './nav_bar';
import Card from './single_card';
import Filters from './filters';
import { Button, SideNav,SideNavItem } from 'react-materialize';
import {FaEllipsisV} from 'react-icons/fa';
import {formatPostData} from "../helpers";
import axios from 'axios';
import {connect} from 'react-redux';
import {setTheme} from '../actions';

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
		this.props.setTheme(this.props.theme.current);
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
		console.log("page 2 props 2", this.props)
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
								<Filters getFilterData = {this.getFilterResponseData.bind(this)}/>
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




