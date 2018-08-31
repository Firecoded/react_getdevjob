import types from '../actions/types';

const DEFAULT_STATE = {
    themeName: 'light',
    theme: {}
};

export default(state = DEFAULT_STATE, action ) => {
    switch(action.type){
        case types.SET_THEME:
        return {themeName: action.themeName, theme:action.theme};
        default:
        return state;
    }
}