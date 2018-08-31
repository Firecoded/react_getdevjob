import types from './types';
import themes from '../themes';

const defaultTheme = 'light';

export const setTheme = (themeName = defaultTheme) => {
    let theme = themes[themeName];

    if(!theme){
        theme = themes[defaultTheme];
        themeName = defaultTheme;
    }
    console.log("WITNESS ME!",theme );
    return {
        type: types.SET_THEME,
        themeName,
        theme
    }
}