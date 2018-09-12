import React, { Component } from 'react';
import './filters.css';
import {Row, Input} from 'react-materialize';
import {formatPostData} from "../helpers";
import axios from 'axios';
import {connect} from 'react-redux';
import {setTheme} from '../actions';

class Filters extends Component {

    constructor(props){
        super(props);

        this.titleObj = {
			"frontend": "Front End", 
			"backend": "Back End",
			"webdeveloper": "Web Developer"
        };

        this.cityObj = {
            "losangeles": "Los Angeles",
            "sandiego": "San Diego",
            "irvine": "Irvine"
        }
        
        this.state = {
            title: "",
            location:"",
            minSalary:'0',
            maxSalary:'200000',
            distance:'45',
            experience:'',
            postedDate:'',
            employmentTypeContract: true,
            employmentTypeInternship: true,
            employmentTypePartTime: true,
            employmentTypeFullTime: true,
            userLat:"33.634875",
            userLng:"-117.740481",
            offset: 0
        }
        this.submitFormData = this.submitFormData.bind(this);
    }

    //once component did mount, change the state to appropriate title
    componentDidMount(){
        // $('#close-btn').sideNav();
        this.setState({
            title: this.handleTitle(this.props.job),
            location: this.handleCity(this.props.city)
        });

    }

    handleChange(event){
        const {name, value} = event.currentTarget;
        this.setState({
            [name]:value
        })
    }

    handleCheckBox(event){
        const {name, checked} = event.currentTarget;
        if(checked !== false){
            this.setState({
                [name]:true
        })
        }else{
            this.setState({
                [name]:false
            })
        }
    }

    //grabs title from url and formats it
    handleTitle(title){
		  return this.titleObj[title];
    }

    //grabs city from url and formats it
    handleCity(city){
        return this.cityObj[city];
    }

    async submitFormData(event){
        console.log('filters submitted')
        this.setState({
            offset: 0
        })
        event.preventDefault();
        const params = formatPostData(this.state);
        const resp = await axios.post("http://localhost:8000/api/get_joblist.php", params);
        console.log("things sent: ", this.state, 'resp: ', resp, 'params:', params);
        this.props.getFilterData(resp, this.state);
        $('.side-nav-control').sideNav('hide');
    }

    render(){
        const minSalary = "All Available";
        let job = this.handleTitle(this.props.job);
        let city = this.handleCity(this.props.city);
        return (
                <form className ="sidebar" onSubmit={this.submitFormData}>
                    <Row className = {`input-row ${this.props.theme.titleText1} ${this.props.theme.navColor}`}>
                        <Input s={12} type ='select' label = 'Job Title' name="title" defaultValue = {job} onChange={this.handleChange.bind(this)}>
                            <option value = ''> All </option>    
                            <option value = 'Web Developer'> Web Developer</option>
                            <option value = 'Software Engineer'>Software Engineer</option>
                            <option value = 'Front End'> Front End</option>
                            <option value = 'Back End'> Back End</option>
                        </Input>
                    </Row>
                    <Row className = {`input-row ${this.props.theme.titleText1} ${this.props.theme.navColor}`}>
                        <Input s={12} type ='select' label = 'City' name="location" defaultValue = {city} onChange={this.handleChange.bind(this)}>
                            <option value = ''> Southern California </option>    
                            <option value = 'Irvine'>Irvine</option>
                            <option value = 'San Diego'>San Diego</option>
                            <option value = 'Los Angeles'>Los Angeles</option>
                        </Input>
                    </Row>
                    <Row className = {`input-row ${this.props.theme.titleText1} ${this.props.theme.navColor}`}>
                        <Input s={6} type ='select' label = 'Min Salary' name="minSalary" defaultValue = {minSalary} onChange={this.handleChange.bind(this)}>
                            <option value = '0'> $0</option>
                            <option value = '60000'> $60K</option>
                            <option value = '90000'> $90K</option>
                        </Input>
                        <Input s={6} type ='select' label = 'Max Salary' name='maxSalary'  defaultValue = '200000' onChange={this.handleChange.bind(this)} >
                            <option value = '60000'> $60K</option>
                            <option value = '90000'> $90K</option>
                            <option value = '200000'> $90K+</option>
                        </Input>
                    </Row>
                    <Row className = {`input-row ${this.props.theme.titleText1} ${this.props.theme.navColor}`}>
                        <Input s={12} type ='select' label = 'Distance' name='distance' defaultValue ='Nearby' onChange={this.handleChange.bind(this)}>
                            <option value = '15'>15 miles</option>
                            <option value = '30'>30 miles</option>
                            <option value = '45'>45 miles</option>
                        </Input>
                    </Row>
                    <Row className = {`input-row ${this.props.theme.titleText1} ${this.props.theme.navColor}`}>
                        <Input s={12} type ='select' label = 'Posted Within' name='postedDate' defaultValue ='All' onChange={this.handleChange.bind(this)}>
                            <option value = ''> Posted Anytime </option>
                            <option value = '7'>7 days</option>
                            <option value = '14'>14 days</option>
                            <option value = '30'>30 days</option>
                        </Input>
                    </Row>
                    <Row className = {`checkboxArea input-row ${this.props.theme.titleText1} ${this.props.theme.navColor}`}>
                        <Input s={6} name='employmentTypeContract' type='checkbox' checked={this.state.employmentTypeContract} value = 'contract' label='Contract'  onChange={this.handleCheckBox.bind(this)} />
                        <Input s={6} name='employmentTypeInternship' type='checkbox' checked={this.state.employmentTypeInternship} value = 'internship' label='Internship'  onChange={this.handleCheckBox.bind(this)} />
                        <Input s={6} name='employmentTypePartTime' type='checkbox' checked={this.state.employmentTypePartTime} value = 'partTime' label='Part'  onChange={this.handleCheckBox.bind(this)}/>
                        <Input s={6} name='employmentTypeFullTime' type='checkbox' checked={this.state.employmentTypeFullTime} value = 'fullTime' label='Full'  onChange={this.handleCheckBox.bind(this)}/>
                    </Row>
                    <Row className = {`input-row ${this.props.theme.titleText1} ${this.props.theme.navColor}`}>
                        <button style={{height: '0px', width: '0px', zIndex: '-1'}} data-activates="filterSideNav" className={`side-nav-control btn col offset-s2 ${this.props.theme.button} ${this.props.theme.buttonText}`}></button>
                        <button data-activates="filterSideNav" className={` btn col offset-s2 ${this.props.theme.button} ${this.props.theme.buttonText}`}>Submit Filters</button>
                    </Row>
                </form>
            )
        }
    }
function mapStateToProps(state){
    return{
        theme: state.theme.theme,
    }
}

export default connect(mapStateToProps,{ setTheme })(Filters);