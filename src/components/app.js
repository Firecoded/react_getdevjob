import React from 'react';
import LandingPage from './landing_page';
import {Switch, Route, withRouter } from 'react-router-dom';
import SearchResults from './search_results';
import SingleJobPage from './single_job_page.js';
import AboutUs from './about_us_v2.js';
import PageNotFound from './page_not_found.js';
import {connect} from 'react-redux';
import {setTheme} from '../actions';

const App = (props) => (   
    	<div className={props.theme.background}>
	    	<Switch>	
		    	<Route exact path = '/' component ={LandingPage}/>
		    	<Route path = '/about-us' component = {AboutUs}/>
				<Route exact path ='/listings/:job/:city' component = {SearchResults}/>
				<Route path ='/listings/:job/:city/:job_id' component = {SingleJobPage}/>
				<Route component = {PageNotFound}/>
			</Switch>
		</div>	  
);

function mapStateToProps( state ){
	return{
		theme: state.theme.theme,
	}
}

export default withRouter(connect(mapStateToProps,{setTheme})(App));
