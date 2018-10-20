import React, {Component} from 'react';
import JCimage from '../../src/assets/images/JCimage.jpeg';
import JTimage from '../../src/assets/images/JTimage.jpeg';
import KCimage from '../../src/assets/images/KCimage.jpeg';
import RKimage from '../../src/assets/images/RKimage2.jpeg';
import './about_us_v2.css';
import {setTheme} from '../actions';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';


class AboutUs extends Component{
    constructor(props){
        super(props);

        this.state = {
            theme: '' 
        }
    }
    componentDidMount(){
        if(localStorage.getItem('theme')){
            this.props.setTheme(localStorage.getItem('theme'));
        } else {
        this.props.setTheme(this.props.theme.current);
        }
    }
    render(){
        return (
            <div className = "container about-us">
                <Link to = '/' className = {`brand-logo-about tn-logo ${this.props.theme.navColor}`}><span className={this.props.theme.titleText2}>&lt;gDJ</span><span className = {this.props.theme.titleText1}>/</span><span className = {this.props.theme.titleText2}>&gt;</span></Link>
                <Link to = '/' className = {`btn backButton ${this.props.theme.button} ${this.props.theme.buttonText}`}>Back</Link>
                <div className = "au-firstRow">
                    <div class="card hoverable">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src={JCimage} />
                        </div>
                        <div class={`card-content ${this.props.theme.navColor}`}>
                            <span class={`card-title activator ${this.props.theme.text1}`}>John C.<i class="material-icons right"></i></span>
                            <p><a href="https://www.linkedin.com/in/john-carlisle-91777a68/" target ="_blank">LinkedIn</a></p>
                            <p><a href="https://github.com/TremendousZ" target ="_blank">GitHub</a></p>
                            <p><a href="http://www.johncarlisle.design" target ="_blank">Portfolio</a></p>
                        </div>
                        <div class={`card-reveal ${this.props.theme.navColor}`}>
                            <span class={`card-title ${this.props.theme.text1}`}>About John<i class="material-icons right">x</i></span>
                            <p className ={`${this.props.theme.text1}`} >Specialty: Front-End Technologies Used: HTML5, CSS3, Materialize.css, JavaScript, ReactJS, and Redux JS</p>
                        </div>
                    </div>
                    <div class="card hoverable">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src={KCimage} />
                        </div>
                        <div class={`card-content ${this.props.theme.navColor}`}>
                            <span class={`card-title activator kris ${this.props.theme.text1}`}>Kris C.<i class="material-icons right"></i></span>
                            <p><a href="https://www.linkedin.com/in/kris-chanthasiriphan-500339121/" target ="_blank">LinkedIn</a></p>
                            <p><a href="https://github.com/krischanthas" target = "_blank">GitHub</a></p>
                            <p><a href="http://www.krischanthas.com" target ="_blank">Portfolio</a></p>
                        </div>
                        <div class={`card-reveal ${this.props.theme.navColor}`}>
                            <span class={`card-title ${this.props.theme.text1}`}>About Kris<i class="material-icons right">x</i></span>
                            <p className ={`${this.props.theme.text1}`}>Specialty: Back-End Technologies Used: PHP, MySQL, Amazon Web Services</p>
                        </div>
                    </div>
                </div>
                <div className = "au-secondRow">
                    <div class="card hoverable">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src={RKimage} />
                        </div>
                        <div class={`card-content ${this.props.theme.navColor}`}>
                            <span class={`card-title activator ${this.props.theme.text1}`}>Ryan K.<i class="material-icons right"></i></span>
                            <p><a href="https://www.linkedin.com/in/ryankang2/" target="_blank">LinkedIn</a></p>
                            <p><a href="https://github.com/ryankang2" target="_blank">GitHub</a></p>
                            <p><a href="http://www.ryanhkang.com" target="_blank">Portfolio</a></p>
                        </div>
                        <div class={`card-reveal ${this.props.theme.navColor}`}>
                            <span class={`card-title ${this.props.theme.text1}`}>About Ryan<i class="material-icons right">x</i></span>
                            <p className ={`${this.props.theme.text1}`} >Specialty: Back-End Technologies Used: PHP, MySQL, Amazon Web Services</p>
                        </div>
                    </div>
                    <div class="card hoverable">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src={JTimage} />
                        </div>
                        <div class={`card-content ${this.props.theme.navColor}`}>
                            <span class={`card-title activator ${this.props.theme.text1}`}>Jacob T.<i class="material-icons right"></i></span>
                            <p><a href="https://www.linkedin.com/in/jacobcodes/" target="_blank">LinkedIn</a></p>
                            <p><a href="https://github.com/Firecoded" target="_blank">GitHub</a></p>
                            <p><a href="http://www.jacobcodes.com" target = "_blank">Portfolio</a></p>
                        </div>
                        <div class={`card-reveal ${this.props.theme.navColor}`}>
                            <span class={`card-title ${this.props.theme.text1}`}>About Jacob<i class="material-icons right">x</i></span>
                            <p className ={`${this.props.theme.text1}`} >Specialty: Front-End Technologies Used: HTML5, CSS3, Materialize.css, JavaScript, ReactJS, and Redux JS</p>
                            <br></br>
                            <p className ={`${this.props.theme.text1}`} >Nickname: "Sunshine"</p>
                        </div>
                    </div>
                    <div class="about-us-container">
                        <h1 class="title">About getDevJob(you)</h1>
                        <div class="information-container">
                            <p>
                                getDevJob(you) was created by developers for developers. When we were scrolling through numerous job boards, we came across a striking similarity
                                between them. The websites were bland and didn't grab our attention. And so, we wanted to create a new experience for job-seekers in the tech industry.
                            </p>
                            <br></br>
                            <p>
                                With getDevJob(you), users are able to analyze salary information for a job, company information such as its location, LinkedIn, and Crunchbase, and 
                                commute from the user's current location to its onsite location. The application also provides different color themes to give the website life and color. 
                            </p>
                            <br></br>
                            <p>
                                The application was built utilizing a ReactJS front-end and a PHP back-end with a MySQL database.
                            </p>
                            <br></br>
                            <p>
                                Thank you for using our app! 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            )
    }   


}

function mapStateToProps( state ){
	return{
		theme: state.theme.theme,
		}
}

export default connect(mapStateToProps,{setTheme})(AboutUs);