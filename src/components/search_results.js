import React, { Component } from 'react';
import './search_results.css';
import NavBar from './nav_bar';
import Card from './single_card';
import Filters from './filters';
import { Button, SideNav,SideNavItem } from 'react-materialize';
import {FaEllipsisV} from 'react-icons/fa';


class SearchResults extends Component {
	constructor(props){
		super(props);

		this.state = {
			left: '',
			right: '',
			response: [{
				"success": true,
				"job": [
					{
						"ID": "441",
						"title": "Solution Engineer",
						"company_name": "Ephesoft",
						"company_id": "226",
						"post_date": "08/10/2018",
						"listing_url": "https://us.jooble.org/desc/-3205885789424363537?ckey=javascript&rgn=6974&pos=21&elckey=-7156090584086508834&age=329&relb=100&brelb=100&bscr=53,291878&scr=53,291878",
						"type_id": "1",
						"description": "<div class=\"vacancy-desc_text_wrapper\">  \t\t\t\t\t<div class=\"desc_text_paragraph\">  <h3> Job Description </h3><br><br><p><em> NOTE This position may be remote in the United States, within reasonable distance from a major airport as travel to client locations is required. </em></p><p> We're looking for an enthusiastic and talented Solutions Engineer to join our first in class Pre-Sales Team. Our Solution engineers work in small teams and influence the direction of our products. In this role, you will focus on supporting our prospect customer base. You will be challenged to work across a variety of customer issues and needs. You will be asked to architect solutions and demonstrate software that solves key business issues. To be successful you would need to bring to the table both technical and soft skills (presentation, communication writing, etc) and paint clear pictures of how Ephesoft software can solve a business problem. Requirements gathering of key success criteria from customers and strong documentation writing skills is a must. </p><p><b> Key Responsibilities </b></p><ul><li><p> Handle multiple sales opportunities simultaneously </p></li><li><p> Work with our customers to enhance business processes through the demonstration and implementation of the Ephesoft products and solutions </p></li><li><p> Perform the full technical configuration required for the deployment of our solutions </p></li><li><p> Articulate Ephesoft product and solution functionality and best practices to customers in an easy to understand language </p></li><li><p> Training partners, clients and end-users in both classroom and one-on-one environments </p></li></ul><p> </p> <h3> Qualifications </h3><p></p><ul><li><p> Bachelor's degree in Computer Science or related major </p></li><li><p> Strong presentation and phone skills, Must be able to communicate clearly with US customer base. </p></li><li><p>3-5+ years of relevant experience doing pre-sales Solution Engineering. </p></li><li><p> Strong Development and Troubleshooting skills. </p></li><li><p> Experience in using Regular Expressions (RegEx) is a plus </p></li><li><p> Good working knowledge of website construction and internet-based technologies </p><ul><li><p> HTML, JavaScript, RESTful and CSS Skills </p></li><li><p> Object Oriented Language Java preferred </p></li><li><p> Experience in both Linux and Windows Operating Systems </p></li><li><p> Database experience with MySQL and MSSQL </p></li><li><p> Knowledge of Tomcat and Apache </p></li></ul></li><li><p> Experience of Microsoft Windows OS administration and troubleshooting (including hardware integration)</p><ul><li><p> Device Manager, Network settings, Event logs, Host files </p></li><li><p> Driver installation and configuration </p></li><li><p> Installation of document Scanner hardware </p></li></ul></li><li><p> Understanding of Network protocols and experience diagnosing connection-related issues </p></li><li><p> Experience with iOS and Android based operating systems/browsers </p><ul><li><p> Experience with mobile application and development is a plus. </p></li></ul></li><li><p> Cloud based providers Azure, AWS experience is helpful. </p></li><li><p> Experience analysing log files and reports from both hardware and application sources. </p></li><li><p> Experience of customer support for software/hardware high tech products </p><ul><li><p> Able to work on issues independently and progress issues with clients and team members in a proactive fashion. </p></li></ul></li><li><p> Willingness to travel up to 50%</p></li></ul><p></p>\t\t\t\t\t</div>  \t\t\t\t</div>",
						"title_comp": "Solution Engineer-Ephesoft",
						"salary_id": "29",
						"company": {
							"ID": "226",
							"name": "Ephesoft",
							"logo": "https://logo.clearbit.com/ephesoft.com",
							"company_website": "ephesoft.com",
							"linkedin_url": "https://www.linkedin.com/company/ephesoft-inc-",
							"ocr_url": "https://www.ocregister.com/?s=Ephesoft&orderby=date&order=desc",
							"crunchbase_url": "https://www.crunchbase.com/organization/ephesoft",
							"location": {
								"ID": "1",
								"company_id": "226",
								"street": "8707 Research Dr",
								"city": "Irvine",
								"state": "CA",
								"zip": "92618",
								"lat": "33.644783",
								"lng": "-117.740241",
								"full_address": "8707 Research Dr, Irvine, CA 92618, USA"
							},
							"salary": {
								"ID": "29",
								"city_salary": "92553",
								"state_salary": "124845",
								"title_city": "Solution Engineer-Irvine"
							}
						}
					},
					{
						"ID": "442",
						"title": "Learning Experience Designer",
						"company_name": "Capital Group",
						"company_id": "227",
						"post_date": "08/06/2018",
						"listing_url": "https://us.jooble.org/desc/3182813127317509367?ckey=javascript&rgn=6974&pos=21&elckey=-7156090584086508834&age=425&relb=100&brelb=100&bscr=49,596024&scr=49,596024",
						"type_id": "1",
						"description": "<div class=\"vacancy-desc_text_wrapper\">  \t\t\t\t\t<div class=\"desc_text_paragraph\">  <p><b> Req ID: </b>19802<br><b> Experience Level: </b> Professional <br><b> Other Location(s): </b> N/A   </p><p><b> Come grow with us </b></p><p></p> At Capital Group, how we work is defined by shared values that include absolute integrity, respect and collaboration. But it’s more than that. It’s smart and highly driven people united in purpose to serve our investors and one another. <p> Bring your energy and unique perspective to Capital and you’ll have the opportunity to grow with us professionally, personally, and financially. You’ll be part of a team that genuinely cares about helping you succeed. You’ll work alongside talented colleagues, many of whom build long careers while progressing through multiple roles, establishing lifelong friendships and making a difference in our communities. In return for your contributions, you’ll receive premier compensation and benefits, and a company-funded retirement plan that ranks among the most generous. <br> </p><p> Capital Group’s Human Resources organization drives the people dimension of our business strategy. We have over 200 Human Resources associates around the world and we work collectively to evolve our culture, strengthen our organization, engage our associates, and drive superior service. </p><p> As a Learning Experience Designer based in our Irvine, CA office you will be a key member of our Investment Operations/Information Technology Group Learning and Development Team. You will provide thought leadership and expertise to our Investment Operations (IO) and Information Technology (ITG) business groups on a broad range of learning and development initiatives including curriculum and technology. </p><p><b> Responsibilities: </b></p><p>•Consult with HR partners, senior leaders and business groups to diagnose and develop learning plans with comprehensive audience analysis, course outline, learning solution design and delivery method </p><p>•Develop innovative solutions to problems through training and an advanced use of technology </p><p>•Utilize creative writing, media (graphic, video) to communicate and engage learners </p><p>•Ensure a holistic approach to learning and developing training based on identified training and non-training interventions (e.g., instructor facilitated session, eLearning, and performance support tools)</p><p>•Identify and prioritize development needs and partner with subject matter experts to align deliverables with business needs </p><p>•Identify and define appropriate change management, communications, and training strategies </p><p>•Building long term, trusted relationships with our clients and colleagues, provide coaching and mentoring support throughout the project lifecycle </p><p>•Experience with L&D platforms including: Learning Portal, SuccessFactors LMS, eLearning development tools, and other technologies as needed </p><p>•Conduct research on industry best practices and maintain current knowledge on learning trends and technologies to ensure high quality deliverables and effective solutions </p><p><b> Qualifications: </b></p><p>•5+ years of instructional design experience </p><p>•Demonstrated in-depth knowledge of instructional design, adult learning practices and eLearning development tools </p><p>•Effective facilitation, diagnostic and consultative skills; proactively anticipates the needs of client groups </p><p>•Excellent written and verbal communication skills in order to effectively deliver important messages across a diverse group of associates and senior business leaders </p><p>•Excellent analytical/problem solving skills and demonstrated ability to influence others effectively </p><p>•Demonstrated ability to analyze complex data, identify trends and turn information into actionable business insights </p><p>•Proficiency and experience with design of SCORM / xAPI compliant courses </p><p>•Working knowledge of HTML, CSS, JavaScript, SQL </p><p>•Proficiency using tools such as Adobe Captivate, Articulate Storyline, Articulate Rise, Adobe Photoshop, Adobe Premiere, Adobe After Effects, and/or VideoScribe </p><p>•Strength in managing multiple priorities and stakeholders simultaneously </p><p>•Bachelor's degree required; Masters in Educational Technology or related is preferred </p><p> </p><p><b> Company Overview: </b><br> Founded in 1931, Capital Group is one of the world’s largest and most trusted investment management companies and home to the American Funds. We manage more than US$1.39 trillion in assets, and our 7,500 associates make our clients their first priority every day. When we do our job right, millions of investors around the world fulfill their dreams and financial goals, from home ownership and higher education, to a comfortable retirement. Our long-term investment results and outstanding service set us apart from our competitors, while our workplace sets us apart from other employers. </p><p><em> We are an equal opportunity employer, which means we comply with all federal, state and local laws that prohibit discrimination when making all decisions about employment. As equal opportunity employers, our policies prohibit unlawful discrimination on the basis of race, religion, color, national origin, ancestry, sex (including gender and gender identity), pregnancy, childbirth and related medical conditions, age, physical or mental disability, medical condition, genetic information, marital status, sexual orientation, citizenship status, AIDS/HIV status, political activities or affiliations, military or veteran status, status as a victim of domestic violence, assault or stalking or any other characteristic protected by federal, state or local law. </em></p>\t\t\t\t\t</div>  \t\t\t\t</div>",
						"title_comp": "Learning Experience Designer-Capital Group",
						"salary_id": "30",
						"company": {
							"ID": "227",
							"name": "Capital Group",
							"logo": "https://logo.clearbit.com/paparazziaccessories.com",
							"company_website": "paparazziaccessories.com",
							"linkedin_url": "https://www.linkedin.com/company/paparazzi-accessories-by-shediva",
							"ocr_url": "https://www.ocregister.com/?s=Capital Group&orderby=date&order=desc",
							"crunchbase_url": "https://www.crunchbase.com/organization/capital-green-group-development",
							"location": {
								"ID": "2",
								"company_id": "227",
								"street": "6455 Irvine Center Dr",
								"city": "Irvine",
								"state": "CA",
								"zip": "92618",
								"lat": "33.6725194",
								"lng": "-117.766565",
								"full_address": "6455 Irvine Center Dr, Irvine, CA 92618, USA"
							},
							"salary": {
								"ID": "30",
								"city_salary": "103222",
								"state_salary": "109391",
								"title_city": "Learning Experience Designer-Irvine"
							}
						}
					},
					{
						"ID": "443",
						"title": "Python Developer, Senior",
						"company_name": "Booz Allen",
						"company_id": "228",
						"post_date": "07/30/2018",
						"listing_url": "https://us.jooble.org/desc/-4442148787049898381?ckey=javascript&rgn=6974&pos=21&elckey=-6481376379067327048&age=573&relb=100&brelb=100&bscr=48,603565&scr=48,603565",
						"type_id": "1",
						"description": "<div class=\"vacancy-desc_text_wrapper\">  \t\t\t\t\t<div class=\"desc_text_paragraph\">  Python Developer, Senior <p> Key Role: </p><p> Work independently to design and develop new software products or major enhancements to existing software. Lead a development team in designing highly complex software systems. Act as the highest level technical expert, addressing problems of systems integration, compatibility, and multiple platforms. Maintain responsibility for project completion. Perform feasibility analysis on potential future projects to management. </p><p></p><p> Basic Qualifications: </p><p>-8+ years of experience with Python development </p><p>-Experience with writing and consuming scalable Web services </p><p>-Experience in working with Couchbase or other NoSQL databases </p><p>-Experience in integrating with remote sensors and with multiple disparate application components in a fail-safe manner </p><p>-Experience with TDD or BDD in Python or other languages </p><p>-Experience with working in data intensive backends and middleware </p><p>-Experience with working in a continuous integration and delivery environment </p><p>-Experience with working in a fast-paced Agile environment </p><p>-Knowledge of code packaging and delivery in a large Python codebase </p><p>-HS diploma or GED </p><p></p><p> Additional Qualifications: </p><p>-Experience in working with Node.js and JavaScript </p><p>-Experience with creating or maintaining microservices and distributed systems </p><p>-Experience in working with Big Data, including with MapReduce </p><p>-Knowledge of Cyber threat intelligence </p><p>-Ability to lead a small team to see a task to completion </p><p>-Ability to constantly improve technology or processes using latest industry standards </p><p>-BA or BS degree </p><p></p><p></p><p> We’re an EOE that  empowers our people—no matter their race, color, religion, sex, gender identity, sexual  orientation,  national  origin, disability, or veteran status—to fearlessly drive change. </p><p></p>\t\t\t\t\t</div>  \t\t\t\t</div>",
						"title_comp": "Python Developer, Senior-Booz Allen",
						"salary_id": "31",
						"company": {
							"ID": "228",
							"name": "Booz Allen",
							"logo": "https://logo.clearbit.com/bah.com",
							"company_website": "bah.com",
							"linkedin_url": "https://www.linkedin.com/company/booz-allen-hamilton",
							"ocr_url": "https://www.ocregister.com/?s=Booz Allen&orderby=date&order=desc",
							"crunchbase_url": "https://www.crunchbase.com/organization/booz-allen-hamilton",
							"location": {
								"ID": "3",
								"company_id": "228",
								"street": "333 City Blvd W # 17",
								"city": "Orange",
								"state": "CA",
								"zip": "92868",
								"lat": "33.7871311",
								"lng": "-117.8936721",
								"full_address": "333 City Blvd W # 17, Orange, CA 92868, USA"
							},
							"salary": {
								"ID": "31",
								"city_salary": "101806",
								"state_salary": "129553",
								"title_city": "Python Developer, Senior-Orange"
							}
						}
					},
					{
						"ID": "444",
						"title": "Sr. Web Developer",
						"company_name": "Spectrum Brands",
						"company_id": "229",
						"post_date": "08/13/2018",
						"listing_url": "https://us.jooble.org/away/-5789603365191215366?p=2&pos=21&cid=216&ckey=javascript&age=257&relb=152&brelb=100&scr=78,18090056&bscr=51,434803",
						"type_id": "1",
						"description": "",
						"title_comp": "Sr. Web Developer-Spectrum Brands",
						"salary_id": "32",
						"company": {
							"ID": "229",
							"name": "Spectrum Brands",
							"logo": "https://logo.clearbit.com/spectrumbrands.com",
							"company_website": "spectrumbrands.com",
							"linkedin_url": "https://www.linkedin.com/company/spectrum-brands",
							"ocr_url": "https://www.ocregister.com/?s=Spectrum Brands&orderby=date&order=desc",
							"crunchbase_url": "https://www.crunchbase.com/organization/spectrum-brands",
							"location": {
								"ID": "4",
								"company_id": "229",
								"street": "19701 Da Vinci",
								"city": "Foothill Ranch",
								"state": "CA",
								"zip": "92610",
								"lat": "33.67495",
								"lng": "-117.655851",
								"full_address": "19701 Da Vinci, Foothill Ranch, CA 92610, USA"
							},
							"salary": {
								"ID": "32",
								"city_salary": "108704",
								"state_salary": "122736",
								"title_city": "Sr. Web Developer-Foothill Ranch"
							}
						}
					}
				]
			}
		] 
		}
	}

	componentDidMount(){
		this.populateCards(this.state.response[0].job);
	}

	getFilterResponseData(respObj){
		this.setState({
			response: respObj
		})
	}

	populateCards(array){
		let alt = 0;
		let leftArray =[];
		let rightArray =[];
		for (var index=0; index < array.length; index++){
			if(alt){
				let temp = <Card key = {index} pullId = {index} details = {this.state.response[0].job[index]}{...this.props} />
				leftArray.push(temp);
				alt = 1-alt;
			} else {
				let temp = <Card key = {index} pullId = {index} details = {this.state.response[0].job[index]}{...this.props} />
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
		return (
			<div className = 'main-cont'>
				<NavBar/>
					<SideNav
				  	trigger = {<Button className ="black sideTrigger"><FaEllipsisV/>Filters</Button>}
				  	options={{closeOnClick:false}}
					>
						<SideNavItem>
							<Filters getFilterData = {this.getFilterResponseData.bind(this)}/>
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




