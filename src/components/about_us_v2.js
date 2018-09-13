import React, {Component} from 'react';
import JCimage from '../../src/assets/images/JCimage.jpeg';
import JTimage from '../../src/assets/images/JTimage.jpeg';
import KCimage from '../../src/assets/images/KCimage.jpeg';
import RKimage from '../../src/assets/images/RKimage.jpeg';
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
        console.log("THIS ONE? STATE " , this.state);
        console.log("This props!", this.props);
    return (
        <div className = "container about-us">
            <Link to = '/' className = {`brand-logo-about tn-logo ${this.props.theme.navColor}`}><span className={this.props.theme.titleText2}>&lt;gDJ</span><span className = {this.props.theme.titleText1}>/</span><span className = {this.props.theme.titleText2}>&gt;</span></Link>
            <div class="card hoverable">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src={JCimage} />
                </div>
                <div class={`card-content ${this.props.theme.navColor}`}>
                    <span class={`card-title activator ${this.props.theme.text1}`}>John Carlisle<i class="material-icons right"></i></span>
                    <p><a href="https://www.linkedin.com/in/john-carlisle-91777a68/" target ="_blank">LinkedIn</a></p>
                    <p><a href="https://github.com/TremendousZ" target ="_blank">GitHub</a></p>
                    <p><a href="#" target ="_blank">Portfolio</a></p>
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
                    <span class={`card-title activator kris ${this.props.theme.text1}`}>Kris Chanthasiriphan<i class="material-icons right"></i></span>
                    <p><a href="https://www.linkedin.com/in/kris-chanthasiriphan-500339121/" target ="_blank">LinkedIn</a></p>
                    <p><a href="https://github.com/krischanthas" target = "_blank">GitHub</a></p>
                    <p><a href="#">Portfolio</a></p>
                </div>
                <div class={`card-reveal ${this.props.theme.navColor}`}>
                    <span class={`card-title ${this.props.theme.text1}`}>About Kris<i class="material-icons right">x</i></span>
                    <p className ={`${this.props.theme.text1}`}>Specialty: Back-End Technologies Used: PHP, MySQL, PHPcurl</p>
                </div>
            </div>
            <div class="card hoverable">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src={RKimage} />
                </div>
                <div class={`card-content ${this.props.theme.navColor}`}>
                    <span class={`card-title activator ${this.props.theme.text1}`}>Ryan Kang<i class="material-icons right"></i></span>
                    <p><a href="https://www.linkedin.com/in/ryankang2/" target="_blank">LinkedIn</a></p>
                    <p><a href="https://github.com/ryankang2" target="_blank">GitHub</a></p>
                    <p><a href="#">Portfolio</a></p>
                </div>
                <div class={`card-reveal ${this.props.theme.navColor}`}>
                    <span class={`card-title ${this.props.theme.text1}`}>About Ryan<i class="material-icons right">x</i></span>
                    <p className ={`${this.props.theme.text1}`} >Specialty: Back-End Technologies Used: PHP, MySQL, PHPcurl</p>
                </div>
            </div>
            <div class="card hoverable">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src={JTimage} />
                </div>
                <div class={`card-content ${this.props.theme.navColor}`}>
                    <span class={`card-title activator ${this.props.theme.text1}`}>Jacob Taylor<i class="material-icons right"></i></span>
                    <p><a href="https://www.linkedin.com/in/jacobcodes/" target="_blank">LinkedIn</a></p>
                    <p><a href="https://github.com/Firecoded" target="_blank">GitHub</a></p>
                    <p><a href="#">Portfolio</a></p>
                </div>
                <div class={`card-reveal ${this.props.theme.navColor}`}>
                    <span class={`card-title ${this.props.theme.text1}`}>About Jacob<i class="material-icons right">x</i></span>
                    <p className ={`${this.props.theme.text1}`} >Specialty: Front-End Technologies Used: HTML5, CSS3, Materialize.css, JavaScript, ReactJS, and Redux JS</p>
                    <br></br>
                    <p className ={`${this.props.theme.text1}`} >Nickname: "Sunshine"</p>
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