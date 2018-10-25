import React,{Component} from 'react';
import GoogleMap from './google_map';
import './business_modal.css';
import TabsInfo from './bm_tabs';
import { Link } from 'react-router-dom';

class BusinessModal extends Component {
    constructor(props){
        super(props);

        this.state={
            distance:'',
            duration:'', 
        }
    }
    componentDidMount(){
        this.getDrivingData();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
            })
        }
    }

    getDrivingData = (distance,duration) =>{
        this.setState(
            {
                distance:distance,
                duration:duration,
            })
    }

    noMap(){
        const { lat, lng, pullId, isOpen } = this.props;
    
        if(!isNaN(this.props.lat)){
            return ( 
            <div className ="bm-map">
                <GoogleMap lat={lat} lng={lng} id={pullId} isOpen={isOpen} drivingInfo={this.getDrivingData} theme={this.props.theme} />
            </div>)
        } else {
            return ( 
                <div className ="bm-map noMap">
                    <GoogleMap lat={lat} lng={lng} id={pullId} isOpen={isOpen} drivingInfo={this.getDrivingData} theme={this.props.theme}/>
                </div>)
        }
    }

    noMapDescription(){
        let {description} = this.props.details;
        const { lat, lng } = this.props;
        if(description===''){
            description = "<h5>No Job Description Provided</h5>";
        }
        return (
            <div className={`bm-jobDetails hoverable`}>
                <label>Job Description</label>
                <p className ={`bm-jobDescription ${this.props.theme.text1} ${(isNaN(lat) || isNaN(lng)) ? 'fullText' : ""}`} dangerouslySetInnerHTML={{__html:description}}></p>
            </div>
        )
    }

    render(){
        const { details} = this.props;
        const {title, company_name, listing_url, company } = details;
        const {logo} = company;
        let linkQuery = this.props.match.url + '/' + this.props.details.ID;
        return (
            <div className={`container modalBody ${this.props.theme.navColor}`}>
                <div className='modalPosition'>
                    <div className="row bm-columnContainer">
                        <div className={`bm-leftColumn card-panel hoverable ${this.props.theme.background}`}>
                            <div className="row bm-buttonRow">
                                <a href={listing_url} target ="_blank" rel="nofollow" className={`btn waves-effect waves-light ${this.props.theme.button} ${this.props.theme.buttonText}`}>Apply</a>
                                <Link to = {linkQuery}  rel="nofollow" target="_blank" className ={`btn waves-effect waves-light ${this.props.theme.button} ${this.props.theme.buttonText}`}>Share</Link>
                            </div>
                            <div className='bm-companyName'>
                                <div className="logoBox">
                                    <img src={logo} />
                                </div>
                                <p className = {`${this.props.theme.titleText1}`}> {company_name}</p>
                            </div>
                            <div className={`bm-jobTitle ${this.props.theme.titleText2}`}>
                                {title}
                            </div>
                            <TabsInfo {...this.props} distance={this.state.distance} duration = {this.state.duration} theme={this.props.theme} />
                        </div>
                        <div className='bm-rightColumn'>
                            <div className='row'>   
                                {this.noMap()}
                                {this.noMapDescription()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BusinessModal;