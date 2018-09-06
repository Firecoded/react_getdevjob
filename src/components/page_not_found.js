import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./page_not_found.css";

class PageNotFound extends Component {
	constructor(props){
		super(props)

	}

	render(){
		return (
			<div className = 'main-404-cont grey lighten-1'>
				<div className = 'center card pnf-cont grey darken-2'>
					<p className = 'pnf-message grey-text text-lighten-3'>Error 404: Could not find page requested</p>
					<Link to = '/' className = 'btn pnf-home grey lighten-1 grey-text text-darken-2'>Home</Link>
				</div>
			</div>
		)	
	}
}

export default PageNotFound;