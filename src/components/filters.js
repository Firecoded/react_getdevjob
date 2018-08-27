import React, { Component } from 'react';
import './filters.css';
import {Row, Input} from 'react-materialize';
// import axios from 'axios';

class Filters extends Component {
    constructor(props){
        super(props);

        this.state = {
            jobtitle:'',
            location:'',
            minSalary:'',
            maxSalary:'',
            distance:'',
            experience:'',
            postedDate:'',
            employmentTypeContract: false,
            employmentTypeInternship: false,
            employmentTypePartTime: false,
            employmentTypeFullTime: false,
        }
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

    // async submitFormData(props){
    //     const resp = await axios.post('url here', this.state);

    //     props.getFilterDate(resp);
        
    // }

    render(){
        const minSalary = "All Available";
        return (
                <form className ="sidebar">
                    <Row>
                        <Input s={12} type ='select' label = 'Job Title' name="jobTitle" defaultValue = 'Web Developer' onChange={this.handleChange.bind(this)}>
                                <option value = 'Web Developer'> Web Developer</option>
                                <option value = 'Front End'> Front End</option>
                                <option value = 'Back End'> Back End</option>
                        </Input>
                    </Row>
                    <Row>
                        <Input s={12} type ='select' label = 'City' name="location" defaultValue = 'Irvine' onChange={this.handleChange.bind(this)}>
                                <option value = 'Irvine'>Irvine</option>
                                <option value = 'San Diego'>San Diego</option>
                                <option value = 'Los Angeles'>Los Angeles</option>
                        </Input>
                    </Row>
                    <Row>
                        <Input s={6} type ='select' label = 'Min Salary' name="minSalary" defaultValue = {minSalary} onChange={this.handleChange.bind(this)}>
                            <option value = '1'> $0</option>
                            <option value = '2'> $30K</option>
                            <option value = '3'> $50K+</option>
                        </Input>
                        <Input s={6} type ='select' label = 'Max Salary' name='maxSalary'  defaultValue = {minSalary} onChange={this.handleChange.bind(this)} >
                            <option value = '1'> $30K</option>
                            <option value = '2'> $50K</option>
                            <option value = '3'> $70K+</option>
                        </Input>
                    </Row>
                    <Row>
                        <Input s={12} type ='select' label = 'Distance' name='distance' defaultValue ='Nearby' onChange={this.handleChange.bind(this)}>
                            <option value = '1'>5 miles</option>
                            <option value = '2'>15 miles</option>
                            <option value = '3'>15+ miles</option>
                        </Input>
                    </Row>
                    <Row>
                        <Input s={12} type ='select' label = 'Experience' name='experience' defaultValue ='All Available' onChange={this.handleChange.bind(this)}>
                            <option value = '1'>0-2 years</option>
                            <option value = '2'>2-5 years</option>
                            <option value = '3'>5+ years</option>
                        </Input>
                    </Row>
                    <Row>
                        <Input s={12} type ='select' label = 'Posted Within' name='postedDate' defaultValue ='All' onChange={this.handleChange.bind(this)}>
                            <option value = '1'>7 days</option>
                            <option value = '2'>14 days</option>
                            <option value = '3'>30 days</option>
                        </Input>
                    </Row>
                    <Row className="checkboxArea">
                        <Input s={6} name='employmentTypeContract' type='checkbox' checked={this.state.employmentTypeContract} value = 'contract' label='Contract'  onChange={this.handleCheckBox.bind(this)} />
                        <Input s={6} name='employmentTypeInternship' type='checkbox' checked={this.state.employmentTypeInternship} value = 'internship' label='Internship'  onChange={this.handleCheckBox.bind(this)} />
                        <Input s={6} name='employmentTypePartTime' type='checkbox' checked={this.state.employmentTypePartTime} value = 'partTime' label='Hourly'  onChange={this.handleCheckBox.bind(this)}/>
                        <Input s={6} name='employmentTypeFullTime' type='checkbox' checked={this.state.employmentTypeFullTime} value = 'fullTime' label='Salary'  onChange={this.handleCheckBox.bind(this)}/>
                    </Row>
                    <Row>
                    <button className='btn col offset-s2'>Submit Filters</button>
                    </Row>
                </form>
            )
        }
    }

export default Filters;