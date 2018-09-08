import React from 'react';
import './loading.css';
import {connect} from 'react-redux';
import {setTheme} from '../actions';


const Loading = (props) => (
		<div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

)

function mapStateToProps( state ){
	return{
		theme: state.theme.theme,
		}
}

export default (connect(mapStateToProps,{setTheme}))(Loading);
