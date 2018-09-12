import React from 'react';
import {connect} from 'react-redux';
import {setTheme} from '../actions';
import './no-results.css';

const NoResults = (props) => (
	<div className = {`no-results-cont ${props.theme.background}`}>
		<div className = {`center no-results-text ${props.theme.text1}`}>No Jobs Found With Selected Filters, Try Changing Filter Options</div>
	</div>
)


function mapStateToProps( state ){
	return{
		theme: state.theme.theme,
	}
}

export default (connect(mapStateToProps,{setTheme}))(NoResults);