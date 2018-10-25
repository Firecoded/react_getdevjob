import React,{Component} from 'react';
import GoogleMap from './google_map';
import './single_job_page.css';
import TabsInfo from './bm_tabs';
import {Link} from 'react-router-dom';
import { formatPostData } from '../helpers';
import axios from 'axios';
import { connect } from 'react-redux';
import {setTheme} from '../actions';
import Loading from './loading';



class SingleJobPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            response:null,
            distance:null,
            duration:null,
            theme:'',
        }

        this.singleJobItem = {
            title:'',
            location:'',
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
            offset:'',   
        }
    }
    
    componentDidMount(){
        if(localStorage.getItem('theme')){
            this.props.setTheme(localStorage.getItem('theme'));
        } else {
        this.props.setTheme(this.props.theme.current);
        }
        this.getSingleJobId(this.props.match.params.job_id, this.singleJobItem);
        this.submitSingleJobData();
    }

    getDrivingData = (distance,duration) =>{
        this.setState(
            {
                distance:distance,
                duration:duration,
            })
    }


    getSingleJobId(id, jobObject){
        jobObject.id = id;
    }

    noMapSinglePage(){
        const {lat} = this.state.response.company.location;
        if(lat !== ""){
            console.log("TRUE");
            return ( 
            <div className ="sp-map">
                <GoogleMap lat={parseFloat(this.state.response.company.location.lat)} lng={parseFloat(this.state.response.company.location.lng)} isOpen={true} drivingInfo={this.getDrivingData}  theme = {this.props.theme}/>
            </div>)
        } else {
            console.log("False");
            return ( 
                <div className ="sp-map noMap">
                    <GoogleMap lat={parseFloat(this.state.response.company.location.lat)} lng={parseFloat(this.state.response.company.location.lng)} isOpen={true} drivingInfo={this.getDrivingData}  theme = {this.props.theme}/>
                </div>)
        }
    }

    noMapDescriptionSinglePage(){
        let {description} = this.state.response;
        const { lat, lng } = this.state.response.company.location;
        if(description===''){
            description = "<h5>No Job Description Provided</h5>";
        }
        return (
            <div className={`sp-jobDetails hoverable`}>
                <label>Job Description</label>
                <p className ={`sp-jobDescription ${this.props.theme.text1} ${(lat == '') ? 'sp-fullText' : ""}`} dangerouslySetInnerHTML={{__html:description}}></p>
            </div>
        )
    }



    async submitSingleJobData(event){
        const params = formatPostData(this.singleJobItem);
        
        const resp = await axios.post("/api/get_joblist.php", params);
        this.setState({
            response:resp.data.jobs[0]});
    }

    render(){
        if(!this.state.response){
            return ( 
                    <div className = {`sp-load-cont sp-overflow ${this.props.theme.background}`}>
                        <div className = 'sp-load-position'> 
                            <Loading/> 
                        </div>
                    </div> 
                    )
        } else {
        let {company_name, description, listing_url, title } = this.state.response;
        const { logo } = this.state.response.company;  
        if(description===''){
            description = "<h5>No Job Description Provided</h5>";
        }
       
        return (
            <div className = {`sp-Body card-panel ${this.props.theme.navColor}`}>
            <div className={`${this.props.theme.navColor}`}>
                <div className='sp-Position'>
                    <div className="row">
                        <div className={`sp-leftColumn card-panel hoverable ${this.props.theme.background}`}>
                            <div className="row sp-buttonRow">
                                <Link to='/' rel="nofollow" className={`btn waves-effect waves-light ${this.props.theme.button} ${this.props.theme.buttonText}`}>Home</Link> 
                                <a href={listing_url} target ="_blank" rel="nofollow" className={`btn waves-effect waves-light ${this.props.theme.button} ${this.props.theme.buttonText}`}>Apply</a>
                                
                            </div>
                            <div className='sp-companyName'>
                            <div className ="sp-logoBox">
                                <img src={logo} />
                            </div>
                                <p className = {`${this.props.theme.titleText1}`}>{company_name}</p>
                            </div>
                            <div className={`sp-jobTitle ${this.props.theme.titleText2}`}>
                               {title}
                            </div>
                            <div className = "tabsContainer">
                                <TabsInfo details = {this.state.response} distance ={this.state.distance} duration = {this.state.duration} theme={this.props.theme}/>
                            </div>
                        </div>
                        <div className='sp-rightColumn'>
                            <div className='row'>   
                                {this.noMapSinglePage()}
                                {this.noMapDescriptionSinglePage()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
    }
}

function mapStateToProps( state ){
	return{
		theme: state.theme.theme,
		}
}

export default connect(mapStateToProps,{setTheme})(SingleJobPage);