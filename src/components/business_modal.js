import React,{Component} from 'react';
import GoogleMap from './google_map';
import './business_modal.css';
import TabsInfo from './bm_tabs';

class BusinessModal extends Component {
    constructor(props){
        super(props);

        this.state={
            distance:'',
            duration:'' 
        }
    }
    componentDidMount(){
        this.getDrivingData();
    }

    getDrivingData = (distance,duration) =>{
        this.setState(
            {
                distance:distance,
                duration:duration,
            })
    }

    render(){
        const { lat, lng, pullId, details, isOpen } = this.props;
        const {title, company_name, listing_url, company } = details;
        let {description} = details;
        if(description===''){
            description = "<h5>No Job Description Provided</h5>";
        }
        const {logo} = company;

        return (
            <div className="container modalBody">
                <div className='modalPosition'>
                    <div className="row">
                        <div className='bm-leftColumn col s4'>
                            <div className="row">
                                <button className='btn col offset-s2 s2 green lighten-1 waves-light'>Save</button>
                                <a href={listing_url} target ="_blank" className='btn col offset-s1 s2 green lighten-1'>Apply</a>
                                <button className='btn col offset-s1 s2'>Share</button>
                            </div>
                            <div className='bm-companyName center'>
                                <img src={logo} />
                                <p> {company_name}</p>
                            </div>
                            <div className='bm-jobTitle center'>
                                {title}
                            </div>
                            <TabsInfo {...this.props} distance={this.state.distance} duration = {this.state.duration}/>
              
                        </div>
                        <div className='bm-rightColumn col s8'>
                            <div className='row'>   
                                <div className ="bm-map">
                                    <GoogleMap lat={lat} lng={lng} id={pullId} isOpen={isOpen} drivingInfo={this.getDrivingData}/>
                                    <button className = "mapStreetViewToggle">Street View</button>
                                </div>
                                <div className='bm-jobDetails'>
                                    <label>Job Description</label>
                                    <p className ="bm-jobDescription" dangerouslySetInnerHTML={{__html:description}}></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BusinessModal;