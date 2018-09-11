import types from '../actions/types';

const DEFAULT_STATE = {
    themeName: 'light',
    theme: {   
        navColor:'grey lighten-3',
        background: 'grey lighten-2',
        titleText1: 'light-blue-text text-lighten-3',
        titleText2: 'cyan-text text-darken-4',
        text1: 'black-text',
        text2: 'grey-text text-darken-2',
        button: 'indigo lighten-3',
        buttonText: 'black-text',
        current: 'light'}
};

export default(state = DEFAULT_STATE, action ) => {
    switch(action.type){
        case types.SET_THEME:
        return {themeName: action.themeName, theme:action.theme};
        default:
        return state;
    }
}