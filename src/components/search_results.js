import React, { Component } from 'react';
import './search_results.css';
import NavBar from './nav_bar';
import Card from './single_card';
import Filters from './filters';
import { Button, SideNav,SideNavItem } from 'react-materialize';


class SearchResults extends Component {
	constructor(props){
		super(props);

		this.state = {
			left: '',
			right: '',
			response: [{
				"success": true,
				"job": [{
			"id": "401",
			"title": "Software Engineer - Mid-Level",
			"company_name": "Boeing",
			"company_id": {
				"name": "Boeing",
				"logo": "https:\/\/logo.clearbit.com\/boeing.com",
				"company_website": "boeing.com",
				"linkedin_url": "https:\/\/www.linkedin.com\/company\/boeing",
				"ocr_url": "https:\/\/www.ocregister.com\/?s=Boeing&orderby=date&order=desc",
				"crunchbase_url": "https:\/\/www.crunchbase.com\/organization\/the-boeing-",
			},
			"post_date": "08\/17\/2018",
			"listing_url": "https:\/\/us.jooble.org\/jdp\/1949726135485514564\/Software-Engineer-+-Mid+Level-Huntington-Beach%2c-CA?ckey=software&rgn=6974&pos=21&elckey=5453138214043691201&age=140&relb=100&brelb=100&bscr=438,97025&scr=438,97025",
			"type_id": "1",
			"description": "<div class=\"vacancy-desc_text_wrapper\">  \t\t\t\t\t<div class=\"desc_text_paragraph\">  <p simplifier=\"block\"><\/p>The Boeing Company is seeking a self-motivated Software Engineer to join the P-8A Acoustic team to work on a variety of exciting opportunities in acoustic modeling and simulation products used in anti-submarine warfare. This position will be part of a diverse team of engineers with various backgrounds and skill levels.<p><\/p><b>POSITION RESPONSIBILITIES:<br><\/b><br>• Assignments will include software test scripts, code development and integration of software components into a fully functional software system.<br>• This includes full life-cycle software development including requirements; designing, documenting, implementing and testing the software; formal qualification and certification of software; and supporting these products through delivery and deployment in the field.<br>• Develop, document and maintain architectures, requirements, algorithms, interfaces and designs for software systems.<p>Boeing is the world's largest aerospace company and leading manufacturer of commercial airplanes and defense, space and security systems. We are engineers and technicians. Skilled scientists and thinkers. Bold innovators and dreamers. Join us, and you can build something better for yourself, for our customers and for the world.<br><\/p><p><\/p><b>This position requires the ability to obtain a US Security Clearance, for which the US Government requires US Citizenship.<p><\/p>Basic Qualifications (Required Skills & Experience):<\/b><p><\/p>• Experience with tools used to verify Software (SW) fixes, integrate new and\/or modified functions and perform pre-release testing<br>• Experience utilizing software integration and test tools<br>• Experience with Agile methodologies and roles<br>• Troubleshooting experience<p><\/p><b>Preferred Qualifications (Desired Skills & Experience):<\/b><p><\/p>• Experience in Anti-Submarine Warfare (ASW) systems\/subsystem.<br>• Experience in desktop application frameworks, Distributed Interactive Simulation (DIS), Python, C++, JAVA, Linux, MATLAB and configuration management tools is preferred.<br>• Experience using DOORS (Dynamic Object Oriented Requirements System).<br>• Experience in SE Linux<br>• Experience with Docker and\/or Kubernetes with a microservices technology<br>• Experience documenting new and legacy software solutions including requirements and design documents and end-user guides<br>• Experience with Agile methodologies and roles<p><\/p><b>Typical Education\/Experience:<\/b> <p><\/p>Degree and typical experience in engineering classification: Bachelor's and 5 or more years' experience, Master's degree with 3 or more years' experience or PhD degree with experience. Bachelor, Master or Doctorate of Science degree from an accredited course of study, in engineering, computer science, mathematics, physics or chemistry. ABET is the preferred, although not required, accreditation standard.<p><b>This position is located in Huntington Beach, CA. Candidates must reside in the area or be willing to relocate at their own expense.<\/b><br><\/p>\t\t\t\t\t<\/div>  \t\t\t\t<\/div>",
			"title_comp": "Software Engineer - Mid-Level-Boeing",
			"location_id": {
				"street": "5301 Bolsa Ave",
				"city": "Huntington Beach",
				"state": "CA",
				"zip": "92647",
				"lat": "33.7477922",
				"lng": "-118.0374228",
				"full_address": "5301 Bolsa Ave, Huntington Beach, CA 92647, USA"
			},
		}]
			}, {
				"success": true,
				"job": [{
			"id": "401",
			"title": "Software Engineer - Mid-Level",
			"company_name": "Boeing",
			"company_id": {
				"name": "Boeing",
				"logo": "https:\/\/logo.clearbit.com\/boeing.com",
				"company_website": "boeing.com",
				"linkedin_url": "https:\/\/www.linkedin.com\/company\/boeing",
				"ocr_url": "https:\/\/www.ocregister.com\/?s=Boeing&orderby=date&order=desc",
				"crunchbase_url": "https:\/\/www.crunchbase.com\/organization\/the-boeing-",
			},
			"post_date": "08\/17\/2018",
			"listing_url": "https:\/\/us.jooble.org\/jdp\/1949726135485514564\/Software-Engineer-+-Mid+Level-Huntington-Beach%2c-CA?ckey=software&rgn=6974&pos=21&elckey=5453138214043691201&age=140&relb=100&brelb=100&bscr=438,97025&scr=438,97025",
			"type_id": "1",
			"description": "<div class=\"vacancy-desc_text_wrapper\">  \t\t\t\t\t<div class=\"desc_text_paragraph\">  <p simplifier=\"block\"><\/p>The Boeing Company is seeking a self-motivated Software Engineer to join the P-8A Acoustic team to work on a variety of exciting opportunities in acoustic modeling and simulation products used in anti-submarine warfare. This position will be part of a diverse team of engineers with various backgrounds and skill levels.<p><\/p><b>POSITION RESPONSIBILITIES:<br><\/b><br>• Assignments will include software test scripts, code development and integration of software components into a fully functional software system.<br>• This includes full life-cycle software development including requirements; designing, documenting, implementing and testing the software; formal qualification and certification of software; and supporting these products through delivery and deployment in the field.<br>• Develop, document and maintain architectures, requirements, algorithms, interfaces and designs for software systems.<p>Boeing is the world's largest aerospace company and leading manufacturer of commercial airplanes and defense, space and security systems. We are engineers and technicians. Skilled scientists and thinkers. Bold innovators and dreamers. Join us, and you can build something better for yourself, for our customers and for the world.<br><\/p><p><\/p><b>This position requires the ability to obtain a US Security Clearance, for which the US Government requires US Citizenship.<p><\/p>Basic Qualifications (Required Skills & Experience):<\/b><p><\/p>• Experience with tools used to verify Software (SW) fixes, integrate new and\/or modified functions and perform pre-release testing<br>• Experience utilizing software integration and test tools<br>• Experience with Agile methodologies and roles<br>• Troubleshooting experience<p><\/p><b>Preferred Qualifications (Desired Skills & Experience):<\/b><p><\/p>• Experience in Anti-Submarine Warfare (ASW) systems\/subsystem.<br>• Experience in desktop application frameworks, Distributed Interactive Simulation (DIS), Python, C++, JAVA, Linux, MATLAB and configuration management tools is preferred.<br>• Experience using DOORS (Dynamic Object Oriented Requirements System).<br>• Experience in SE Linux<br>• Experience with Docker and\/or Kubernetes with a microservices technology<br>• Experience documenting new and legacy software solutions including requirements and design documents and end-user guides<br>• Experience with Agile methodologies and roles<p><\/p><b>Typical Education\/Experience:<\/b> <p><\/p>Degree and typical experience in engineering classification: Bachelor's and 5 or more years' experience, Master's degree with 3 or more years' experience or PhD degree with experience. Bachelor, Master or Doctorate of Science degree from an accredited course of study, in engineering, computer science, mathematics, physics or chemistry. ABET is the preferred, although not required, accreditation standard.<p><b>This position is located in Huntington Beach, CA. Candidates must reside in the area or be willing to relocate at their own expense.<\/b><br><\/p>\t\t\t\t\t<\/div>  \t\t\t\t<\/div>",
			"title_comp": "Software Engineer - Mid-Level-Boeing",
			"location_id": {
				"street": "5301 Bolsa Ave",
				"city": "Huntington Beach",
				"state": "CA",
				"zip": "92647",
				"lat": "33.7477922",
				"lng": "-118.0374228",
				"full_address": "5301 Bolsa Ave, Huntington Beach, CA 92647, USA"
			},
		}]
			}, {
				"success": true,
				"job": [{
			"id": "401",
			"title": "Software Engineer - Mid-Level",
			"company_name": "Boeing",
			"company_id": {
				"name": "Boeing",
				"logo": "https:\/\/logo.clearbit.com\/boeing.com",
				"company_website": "boeing.com",
				"linkedin_url": "https:\/\/www.linkedin.com\/company\/boeing",
				"ocr_url": "https:\/\/www.ocregister.com\/?s=Boeing&orderby=date&order=desc",
				"crunchbase_url": "https:\/\/www.crunchbase.com\/organization\/the-boeing-",
			},
			"post_date": "08\/17\/2018",
			"listing_url": "https:\/\/us.jooble.org\/jdp\/1949726135485514564\/Software-Engineer-+-Mid+Level-Huntington-Beach%2c-CA?ckey=software&rgn=6974&pos=21&elckey=5453138214043691201&age=140&relb=100&brelb=100&bscr=438,97025&scr=438,97025",
			"type_id": "1",
			"description": "<div class=\"vacancy-desc_text_wrapper\">  \t\t\t\t\t<div class=\"desc_text_paragraph\">  <p simplifier=\"block\"><\/p>The Boeing Company is seeking a self-motivated Software Engineer to join the P-8A Acoustic team to work on a variety of exciting opportunities in acoustic modeling and simulation products used in anti-submarine warfare. This position will be part of a diverse team of engineers with various backgrounds and skill levels.<p><\/p><b>POSITION RESPONSIBILITIES:<br><\/b><br>• Assignments will include software test scripts, code development and integration of software components into a fully functional software system.<br>• This includes full life-cycle software development including requirements; designing, documenting, implementing and testing the software; formal qualification and certification of software; and supporting these products through delivery and deployment in the field.<br>• Develop, document and maintain architectures, requirements, algorithms, interfaces and designs for software systems.<p>Boeing is the world's largest aerospace company and leading manufacturer of commercial airplanes and defense, space and security systems. We are engineers and technicians. Skilled scientists and thinkers. Bold innovators and dreamers. Join us, and you can build something better for yourself, for our customers and for the world.<br><\/p><p><\/p><b>This position requires the ability to obtain a US Security Clearance, for which the US Government requires US Citizenship.<p><\/p>Basic Qualifications (Required Skills & Experience):<\/b><p><\/p>• Experience with tools used to verify Software (SW) fixes, integrate new and\/or modified functions and perform pre-release testing<br>• Experience utilizing software integration and test tools<br>• Experience with Agile methodologies and roles<br>• Troubleshooting experience<p><\/p><b>Preferred Qualifications (Desired Skills & Experience):<\/b><p><\/p>• Experience in Anti-Submarine Warfare (ASW) systems\/subsystem.<br>• Experience in desktop application frameworks, Distributed Interactive Simulation (DIS), Python, C++, JAVA, Linux, MATLAB and configuration management tools is preferred.<br>• Experience using DOORS (Dynamic Object Oriented Requirements System).<br>• Experience in SE Linux<br>• Experience with Docker and\/or Kubernetes with a microservices technology<br>• Experience documenting new and legacy software solutions including requirements and design documents and end-user guides<br>• Experience with Agile methodologies and roles<p><\/p><b>Typical Education\/Experience:<\/b> <p><\/p>Degree and typical experience in engineering classification: Bachelor's and 5 or more years' experience, Master's degree with 3 or more years' experience or PhD degree with experience. Bachelor, Master or Doctorate of Science degree from an accredited course of study, in engineering, computer science, mathematics, physics or chemistry. ABET is the preferred, although not required, accreditation standard.<p><b>This position is located in Huntington Beach, CA. Candidates must reside in the area or be willing to relocate at their own expense.<\/b><br><\/p>\t\t\t\t\t<\/div>  \t\t\t\t<\/div>",
			"title_comp": "Software Engineer - Mid-Level-Boeing",
			"location_id": {
				"street": "5301 Bolsa Ave",
				"city": "Huntington Beach",
				"state": "CA",
				"zip": "92647",
				"lat": "33.7477922",
				"lng": "-118.0374228",
				"full_address": "5301 Bolsa Ave, Huntington Beach, CA 92647, USA"
			},
		}]
			}, {
				"success": true,
				"job": [{
			"id": "401",
			"title": "Software Engineer - Mid-Level",
			"company_name": "Boeing",
			"company_id": {
				"name": "Boeing",
				"logo": "https:\/\/logo.clearbit.com\/boeing.com",
				"company_website": "boeing.com",
				"linkedin_url": "https:\/\/www.linkedin.com\/company\/boeing",
				"ocr_url": "https:\/\/www.ocregister.com\/?s=Boeing&orderby=date&order=desc",
				"crunchbase_url": "https:\/\/www.crunchbase.com\/organization\/the-boeing-",
			},
			"post_date": "08\/17\/2018",
			"listing_url": "https:\/\/us.jooble.org\/jdp\/1949726135485514564\/Software-Engineer-+-Mid+Level-Huntington-Beach%2c-CA?ckey=software&rgn=6974&pos=21&elckey=5453138214043691201&age=140&relb=100&brelb=100&bscr=438,97025&scr=438,97025",
			"type_id": "1",
			"description": "<div class=\"vacancy-desc_text_wrapper\">  \t\t\t\t\t<div class=\"desc_text_paragraph\">  <p simplifier=\"block\"><\/p>The Boeing Company is seeking a self-motivated Software Engineer to join the P-8A Acoustic team to work on a variety of exciting opportunities in acoustic modeling and simulation products used in anti-submarine warfare. This position will be part of a diverse team of engineers with various backgrounds and skill levels.<p><\/p><b>POSITION RESPONSIBILITIES:<br><\/b><br>• Assignments will include software test scripts, code development and integration of software components into a fully functional software system.<br>• This includes full life-cycle software development including requirements; designing, documenting, implementing and testing the software; formal qualification and certification of software; and supporting these products through delivery and deployment in the field.<br>• Develop, document and maintain architectures, requirements, algorithms, interfaces and designs for software systems.<p>Boeing is the world's largest aerospace company and leading manufacturer of commercial airplanes and defense, space and security systems. We are engineers and technicians. Skilled scientists and thinkers. Bold innovators and dreamers. Join us, and you can build something better for yourself, for our customers and for the world.<br><\/p><p><\/p><b>This position requires the ability to obtain a US Security Clearance, for which the US Government requires US Citizenship.<p><\/p>Basic Qualifications (Required Skills & Experience):<\/b><p><\/p>• Experience with tools used to verify Software (SW) fixes, integrate new and\/or modified functions and perform pre-release testing<br>• Experience utilizing software integration and test tools<br>• Experience with Agile methodologies and roles<br>• Troubleshooting experience<p><\/p><b>Preferred Qualifications (Desired Skills & Experience):<\/b><p><\/p>• Experience in Anti-Submarine Warfare (ASW) systems\/subsystem.<br>• Experience in desktop application frameworks, Distributed Interactive Simulation (DIS), Python, C++, JAVA, Linux, MATLAB and configuration management tools is preferred.<br>• Experience using DOORS (Dynamic Object Oriented Requirements System).<br>• Experience in SE Linux<br>• Experience with Docker and\/or Kubernetes with a microservices technology<br>• Experience documenting new and legacy software solutions including requirements and design documents and end-user guides<br>• Experience with Agile methodologies and roles<p><\/p><b>Typical Education\/Experience:<\/b> <p><\/p>Degree and typical experience in engineering classification: Bachelor's and 5 or more years' experience, Master's degree with 3 or more years' experience or PhD degree with experience. Bachelor, Master or Doctorate of Science degree from an accredited course of study, in engineering, computer science, mathematics, physics or chemistry. ABET is the preferred, although not required, accreditation standard.<p><b>This position is located in Huntington Beach, CA. Candidates must reside in the area or be willing to relocate at their own expense.<\/b><br><\/p>\t\t\t\t\t<\/div>  \t\t\t\t<\/div>",
			"title_comp": "Software Engineer - Mid-Level-Boeing",
			"location_id": {
				"street": "5301 Bolsa Ave",
				"city": "Huntington Beach",
				"state": "CA",
				"zip": "92647",
				"lat": "33.7477922",
				"lng": "-118.0374228",
				"full_address": "5301 Bolsa Ave, Huntington Beach, CA 92647, USA"
			},
		}]
			}
		] 
		}
	}

	componentDidMount(){
		this.populateCards(this.state.response);
	}
	populateCards(array){
		let alt = 0;
		let leftArray =[];
		let rightArray =[];
		for (var index=0; index < array.length; index++){
			if(alt){
				let temp = <Card key = {index} pullId = {index} details = {this.state.response[index]}{...this.props} />
				leftArray.push(temp);
				alt = 1-alt;
			} else {
				let temp = <Card key = {index} pullId = {index} details = {this.state.response[index]}{...this.props} />
				rightArray.push(temp);
				alt = 1-alt;
			}
		}
		this.setState({
				left:leftArray,
				right: rightArray
		})
	}

	render() {
		console.log('Props:', this.props);
		return (
			<div className = 'main-cont'>
				<NavBar/>
					<SideNav
				  	trigger = {<Button className = "sideTrigger">Filters</Button>}
				  	options={{closeOnClick:false}}
					>
						<SideNavItem>
							<Filters />
						</SideNavItem>
					</SideNav>
				<div className = 'cardArea'>
                   	<div className='leftColumn'>
	                    {this.state.left}
	                </div>    
                	<div className='rightColumn'>
						{this.state.right}
                	</div>
                </div>	
			</div>
		);
	}
}

export default SearchResults;
