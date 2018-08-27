import React from 'react';
import LandingPage from './landing_page';
import {Route} from 'react-router-dom';
import SearchResults from './search_results';
import SingleJobPage from './single_job_page.js';

const App = () => (   
    	<div className="test" style={{'position':'relative'}}>
	    	<Route exact path = '/' component ={LandingPage}/>
			<Route exact path ='/:job/:city' component = {SearchResults}/>
			<Route path ='/:job/:city/:job_id' component = {SingleJobPage}/>
		</div>	  
);

export default App;
