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
            <div className={`container modalBody ${this.props.theme.background}`}>
                <div className='modalPosition'>
                    <div className="row bm-columnContainer">
                        <div className='bm-leftColumn'>
                            <div className="row bm-buttonRow">
                                <a href={listing_url} target ="_blank" className={`btn ${this.props.theme.button}`}>Apply</a>
                                <button className={`btn ${this.props.theme.button}`}>Share</button>
                            </div>
                            <div className='bm-companyName'>
                                <img src={logo} />
                                <p className = {`${this.props.theme.titleText1}`}> {company_name}</p>
                            </div>
                            <div className={`bm-jobTitle ${this.props.theme.titleText2}`}>
                                {title}
                            </div>
                            <TabsInfo {...this.props} distance={this.state.distance} duration = {this.state.duration} theme={this.props.theme} />
                        </div>
                        <div className='bm-rightColumn'>
                            <div className='row'>   
                                <div className ="bm-map">
                                    <GoogleMap lat={lat} lng={lng} id={pullId} isOpen={isOpen} drivingInfo={this.getDrivingData}/>
                                </div>
                               
                                <div className='bm-jobDetails'>
                                    <label>Job Description</label>
                                    <p className ={`bm-jobDescription ${this.props.theme.text1}`} dangerouslySetInnerHTML={{__html:description}}></p>
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