import React,{Component} from 'react';
import GoogleMap from './google_map';
import './business_modal.css';
import TabsInfo from './bm_tabs';

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
                    <div className="row bm-columnContainer">
                        <div className='bm-leftColumn'>
                            <div className="row bm-buttonRow">
                                <a href={listing_url} target ="_blank" className='btn green lighten-1'>Apply</a>
                                <button className='btn '>Share</button>
                            </div>
                            <div className='bm-companyName'>
                                <img src={logo} />
                                <p> {company_name}</p>
                            </div>
                            <div className='bm-jobTitle'>
                                {title}
                            </div>
                            <TabsInfo {...this.props} distance={this.state.distance} duration = {this.state.duration}/>
                        </div>
                        <div className='bm-rightColumn'>
                            <div className='row'>   
                                <div className ="bm-map">
                                    <GoogleMap lat={lat} lng={lng} id={pullId} isOpen={isOpen} drivingInfo={this.getDrivingData}/>
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