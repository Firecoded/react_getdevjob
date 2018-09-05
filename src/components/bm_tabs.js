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

    validateCompanySite(titleText1,buttonStyle){
        let { company_website } = this.props.details.company;
        if(company_website !== ''){
            return (
                <div className='row'>
                    <p className={`center ${titleText1}`}>Learn about the company through their website</p>
                    <a href = {company_website}  target ="_blank" className={`btn col offset-s4 s4 ${buttonStyle}`} >Company</a>
                </div>
            )
        } else {
            return(
                <div className='row'>
                    <p className='center'>Company website unavailable at this time</p>
                    <a className='btn col offset-s4 s4 blue disabled' >Company</a>
                </div>
            )
        }
    }
    validateLinkedIn(titleText1,buttonStyle){
        let { linkedin_url } = this.props.details.company;
        if(linkedin_url !== ''){
            return (
                <div className='row'>
                    <p className={`center ${titleText1}`}>Do you know anyone working here?</p>
                    <a href = {linkedin_url} target= '_blank' className={`btn col offset-s4 s4 ${buttonStyle}`} >LinkedIn</a>
                </div>
            )
        } else{
            linkedin_url = null;
            return (
                <div className='row'>
                    <p className='center'>LinkedIn info unavailable at this time</p>
                    <a className='btn col offset-s4 s4 blue disabled' >LinkedIn</a>
                </div>
            )
        }
    }
    render(){
        const {ocr_url, location} = this.props.details.company;
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
                            <div className={`center ${titleText1}`}>avgSalary(<span className={` ${titleText2}`}>{city}</span>)</div>
                            <div className={`center ${text1}`}>{city_salary}</div>
                                <SalaryPercentage {...this.props}/>  
                            <div className={`center ${titleText1}`}>avgSalary(<span className={` ${titleText2}`}>California</span>)</div>
                            <div className={`center ${text1}`}> {state_salary}</div>
                        </div>
                    </div>
                </Tab>
                <Tab title="commute" >
                    <div className="section2">
                        <div className='col s12' id='Details'>
                            <ul className = "bm-details center">
                                <li className={`${titleText1}`}>companyAddress()</li>
                                <li className={`${text1}`}>{full_address}</li>
                                <li className={`${titleText1}`}>estDriveTime()</li>
                                <li className={`${text1}`}>{this.props.duration}</li>
                                <li className={`${titleText1}`}>distanceFromMe()</li>
                                <li className={`${text1}`}>{this.props.distance}</li>

                            </ul>
                        </div>
                    </div>
                </Tab>
                <Tab title="company">
                    <div className="setion3">
                        <div id='Learn More' className ='col s12 bm-more'>
                            {this.validateCompanySite(titleText1, this.props.theme.button)}
                            {this.validateLinkedIn(titleText1, this.props.theme.button)}
                            <div className='row'>
                                <p className={`center ${titleText1}`}>Any new or relavent business articles?</p>
                                <a href = {ocr_url} target= '_blank' className={`btn col offset-s4 s4 ${this.props.theme.button}`} >Check OCR</a>
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs>
    )
    }
}


export default TabsInfo;