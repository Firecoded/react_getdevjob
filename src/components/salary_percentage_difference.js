import React,{Component} from 'react';

class SalaryPercentage extends Component{
    constructor(props){
        super(props);

        this.state= {
            payStatus:'',
            percentageDifference:'',
            color:''
        }
    }

    componentDidMount(){
        const {city_salary,state_salary} = this.props.details.salary;
        this.findThePercentageDifference(city_salary, state_salary)
    }

    findThePercentageDifference(cityAvg , stateAvg){
        let difference = parseInt(stateAvg) - parseInt(cityAvg);
        let percentageDifference = ((difference / stateAvg)*100).toFixed(2);
        if(percentageDifference < 0){
            this.setState(
                {   
                    percentageDifference:  Math.abs(percentageDifference),
                    payStatus:"higher",
            });
          
        } else {
            this.setState(
                {   
                    percentageDifference:  percentageDifference,
                    payStatus:"lower",
                }
            )   
        }
    }

    render(){
        return(
            <p className = {this.state.percentageDifference>0?'red-text':'green-text'} >This salary is {this.state.percentageDifference}% {this.state.payStatus} than the state average.</p>
        )
    }
}

export default SalaryPercentage;