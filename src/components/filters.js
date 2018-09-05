import React, { Component } from 'react';
import './filters.css';
import {Row, Input} from 'react-materialize';
import {formatPostData} from "../helpers";
import axios from 'axios';

class Filters extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            title:'',
            location:'Irvine',
            minSalary:'',
            maxSalary:'',
            distance:'',
            experience:'',
            postedDate:'',
            employmentTypeContract: true,
            employmentTypeInternship: true,
            employmentTypePartTime: true,
            employmentTypeFullTime: true,
            userLat:'',
            userLng:'',
        }
        this.submitFormData = this.submitFormData.bind(this);

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

    handleTitle(title){
        if(title === "frontend"){
            return "Front End";
        }
        else if(title === "backend"){
            return "Back End";
        }
        else{
            return "Web Developer";
        }
    }

    async submitFormData(event){
        event.preventDefault();
        const params = formatPostData(this.state);
        const resp = await axios.post("http://localhost:8000/api/get_joblist.php", params);

        console.log("things sent: ", this.state);
        this.props.getFilterData(resp);
        

        console.log("AXIOS FILTER RESPONSE     :", resp);
        this.props.getFilterData(resp);   
    }

    render(){
        const minSalary = "All Available";
        let job = this.handleTitle(this.props.job);
        let city = this.props.city.charAt(0).toUpperCase() + this.props.city.slice(1);
        return (
                <form className ="sidebar" onSubmit={this.submitFormData}>
                    <Row>
                        <Input s={12} type ='select' label = 'Job Title' name="title" defaultValue = {job} onChange={this.handleChange.bind(this)}>
                                <option value = ''> All </option>    
                                <option value = 'Web Developer'> Web Developer</option>
                                <option value = 'Front End'> Front End</option>
                                <option value = 'Back End'> Back End</option>
                        </Input>
                    </Row>
                    <Row>
                        <Input s={12} type ='select' label = 'City' name="location" defaultValue = {city} onChange={this.handleChange.bind(this)}>
                                <option value = ''> All </option>    
                                <option value = 'Irvine'>Irvine</option>
                                <option value = 'San Diego'>San Diego</option>
                                <option value = 'Los Angeles'>Los Angeles</option>
                        </Input>
                    </Row>
                    <Row>
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
                    <Row>
                        <Input s={12} type ='select' label = 'Distance' name='distance' defaultValue ='Nearby' onChange={this.handleChange.bind(this)}>
                            <option value = ''> Any </option>
                            <option value = '5'>5 miles</option>
                            <option value = '15'>15 miles</option>
                            <option value = '15+'>15+ miles</option>
                        </Input>
                    </Row>
                    {/* <Row>
                        <Input s={12} type ='select' label = 'Experience' name='experience' defaultValue ='All Available' onChange={this.handleChange.bind(this)}>
                            <option value = '0-2'>0-2 years</option>
                            <option value = '2-5'>2-5 years</option>
                            <option value = '5+'>5+ years</option>
                        </Input>
                    </Row> */}
                    <Row>
                        <Input s={12} type ='select' label = 'Posted Within' name='postedDate' defaultValue ='All' onChange={this.handleChange.bind(this)}>
                            <option value = ''> Posted Anytime </option>
                            <option value = '7'>7 days</option>
                            <option value = '14'>14 days</option>
                            <option value = '30'>30 days</option>
                        </Input>
                    </Row>
                    <Row className="checkboxArea">
                        <Input s={6} name='employmentTypeContract' type='checkbox' checked={this.state.employmentTypeContract} value = 'contract' label='Contract'  onChange={this.handleCheckBox.bind(this)} />
                        <Input s={6} name='employmentTypeInternship' type='checkbox' checked={this.state.employmentTypeInternship} value = 'internship' label='Internship'  onChange={this.handleCheckBox.bind(this)} />
                        <Input s={6} name='employmentTypePartTime' type='checkbox' checked={this.state.employmentTypePartTime} value = 'partTime' label='Part'  onChange={this.handleCheckBox.bind(this)}/>
                        <Input s={6} name='employmentTypeFullTime' type='checkbox' checked={this.state.employmentTypeFullTime} value = 'fullTime' label='Full'  onChange={this.handleCheckBox.bind(this)}/>
                    </Row>
                    <Row>
                        <button className='btn col offset-s2'>Submit Filters</button>
                    </Row>
                </form>
            )
        }
    }

export default Filters;