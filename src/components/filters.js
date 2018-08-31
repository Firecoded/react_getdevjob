import React, { Component } from 'react';
import './filters.css';
import {Row, Input} from 'react-materialize';
import {formatPostData} from "../helpers";
import axios from 'axios';

class Filters extends Component {
    constructor(props){
        super(props);

        this.state = {
            title:'Web Developer',
            location:'Irvine',
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

    async submitFormData(event){
        event.preventDefault();
        console.log(this.state);
        const dataToSend = {
            details : this.state,
        }
       const params = formatPostData(this.state);
        console.log("data: ", params);
        const resp = await axios.post("http://localhost:8000/api/get_joblist.php", params);

        this.props.getFilterData(resp);
        
    }

    render(){
        const minSalary = "All Available";
        return (
                <form className ="sidebar" onSubmit={this.submitFormData}>
                    <Row>
                        <Input s={12} type ='select' label = 'Job Title' name="title" defaultValue = 'Web Developer' onChange={this.handleChange.bind(this)}>
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
                            <option value = '0'> $0</option>
                            <option value = '30000'> $30K</option>
                            <option value = '50000'> $50K+</option>
                        </Input>
                        <Input s={6} type ='select' label = 'Max Salary' name='maxSalary'  defaultValue = {minSalary} onChange={this.handleChange.bind(this)} >
                            <option value = '30000'> $30K</option>
                            <option value = '50000'> $50K</option>
                            <option value = '70000'> $70K+</option>
                        </Input>
                    </Row>
                    <Row>
                        <Input s={12} type ='select' label = 'Distance' name='distance' defaultValue ='Nearby' onChange={this.handleChange.bind(this)}>
                            <option value = '5'>5 miles</option>
                            <option value = '15'>15 miles</option>
                            <option value = '15+'>15+ miles</option>
                        </Input>
                    </Row>
                    <Row>
                        <Input s={12} type ='select' label = 'Experience' name='experience' defaultValue ='All Available' onChange={this.handleChange.bind(this)}>
                            <option value = '0-2'>0-2 years</option>
                            <option value = '2-5'>2-5 years</option>
                            <option value = '5+'>5+ years</option>
                        </Input>
                    </Row>
                    <Row>
                        <Input s={12} type ='select' label = 'Posted Within' name='postedDate' defaultValue ='All' onChange={this.handleChange.bind(this)}>
                            <option value = '7'>7 days</option>
                            <option value = '14'>14 days</option>
                            <option value = '30'>30 days</option>
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