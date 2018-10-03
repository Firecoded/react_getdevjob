import React, {Component} from 'react';
import {Tabs, Tab} from 'react-materialize';
import './bm-tabs.css';
import SalaryPercentage from './salary_percentage_difference';


class TabsInfo extends Component{
    constructor(props){
        super(props);

        this.state = {
            salary: 'active',
            details: '',
            learnMore:''
        }
    }

    displaySalaryInDollars(salary){
        let afterComma, firstThreeDigits, combinedArrays;
        let salaryArray = salary.split('');
        afterComma = salaryArray.slice(0,salaryArray.length-3);
        firstThreeDigits = salaryArray.slice(salaryArray.length-4,salaryArray.length-1);
        firstThreeDigits.unshift(",");
        combinedArrays = afterComma.concat(firstThreeDigits);
        let salaryInDollars ='$' + combinedArrays.join('');
        return salaryInDollars;
    }
    validateCrunchBase(titleText1,buttonStyle){
        let { crunchbase_url } = this.props.details.company;
        if(crunchbase_url !== ''){
            if(crunchbase_url.includes('http://')){
                crunchbase_url = crunchbase_url.replace('http://', '')  
            }
            if(crunchbase_url.includes('https://')){
                crunchbase_url = crunchbase_url.replace('https://', '')
            }
            if(!crunchbase_url.includes('www')){
                crunchbase_url= 'www.' + crunchbase_url;
            }
            return (
                <div className='row'>
                    <a href = {'http://' + crunchbase_url}  target ="_blank" className={`btn waves-effect waves-light ${buttonStyle} ${this.props.theme.buttonText}`} >Crunchbase</a>
                </div>
            )
        } else {
            return(
                <div className='row'>
                    <a className='btn blue disabled' >CrunchBase</a>
                </div>
            )
        }
    }

    validateCompanySite(titleText1,buttonStyle){
        let { company_website } = this.props.details.company;
        if(company_website !== ''){
            if(company_website.includes('http://')){
                company_website = company_website.replace('http://', '')  
            }
            if(company_website.includes('https://')){
                company_website = company_website.replace('https://', '')
            }
            if(!company_website.includes('www')){
                company_website= 'www.' + company_website;
            }
            return (
                <div className='row'>
                    <a href = {'http://' + company_website}  target ="_blank" className={`btn waves-effect waves-light ${buttonStyle} ${this.props.theme.buttonText}`} >Company Website</a>
                </div>
            )
        } else {
            return(
                <div className='row'>
                    <a className='btn blue disabled' >Company Website</a>
                </div>
            )
        }
    }
    validateLinkedIn(titleText1,buttonStyle){
        let { linkedin_url } = this.props.details.company;
        if(linkedin_url !== ''){
            if(linkedin_url.includes('http://')){
                linkedin_url = linkedin_url.replace('http://', '')  
            }
            if(linkedin_url.includes('https://')){
                linkedin_url = linkedin_url.replace('https://', '')
            }
            if(!linkedin_url.includes('www')){
                linkedin_url= 'www.' + linkedin_url;
            }
            return (
                <div className='row'>
                    <a href = {'http://' + linkedin_url} target= '_blank' className={`btn waves-effect waves-light ${buttonStyle} ${this.props.theme.buttonText}`} >LinkedIn</a>
                </div>
            )
        } else{
            linkedin_url = null;
            return (
                <div className='row'>
                    <a className='btn blue disabled' >LinkedIn</a>
                </div>
            )
        }
    }
    render(){
        const {location} = this.props.details.company;
        const {full_address, city} = location;
        let {city_salary, state_salary} = this.props.details.salary;
        let titleText1 = this.props.theme.titleText1;
        let titleText2 = this.props.theme.titleText2;
        let text1 = this.props.theme.text1;
        let text2 = this.props.theme.text2;
        city_salary = this.displaySalaryInDollars(city_salary);
        state_salary = this.displaySalaryInDollars(state_salary);
    return(
            <Tabs className={`z-depth-1 tabs-fixed-width tabsBar ${this.props.theme.background}`}>
                <Tab title="salary" active >
                    <div className='section 1'>
                        <div className='col s12 bm-salary'>
                            <div className={`center ${titleText1}`}>avgSalary(<span className={` ${text1}`}>{city}</span>)</div>
                            <div className={`center ${text1}`}>{city_salary}</div>
                                <SalaryPercentage {...this.props}/>  
                            <div className={`center ${titleText1}`}>avgSalary(<span className={` ${text1}`}>California</span>)</div>
                            <div className={`center ${text1}`}> {state_salary}</div>
                        </div>
                    </div>
                </Tab>
                <Tab title="commute" >
                    <div className="section2">
                        <div className='col s12' id='Details'>
                            <ul className = "bm-details center">
                                <li className={`${titleText1}`}>companyAddress()</li>
                                <li className={`${text1}`}>{full_address ? full_address : "Location info unavailable"}</li>
                                <li className={`${titleText1}`}>estDriveTime()</li>
                                <li className={`${text1}`}>{this.props.duration ? this.props.duration : "Feature requires geolocation sharing"}</li>
                                <li className={`${titleText1}`}>distanceFromMe()</li>
                                <li className={`${text1}`}>{this.props.distance ? this.props.distance : "Feature requires geolocation sharing"}</li>
                            </ul>
                        </div>
                    </div>
                </Tab>
                <Tab title="company">
                    <div className="setion3">
                        <div id='learnMore' className ='col s12 bm-more'>
                            {this.validateCompanySite(titleText1, this.props.theme.button)}
                            {this.validateLinkedIn(titleText1, this.props.theme.button)}
                            {this.validateCrunchBase(titleText1, this.props.theme.button)}
                        </div>
                    </div>
                </Tab>
            </Tabs>
        )
    }
}


export default TabsInfo;