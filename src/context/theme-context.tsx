import { ReactChildren } from 'hoist-non-react-statics/node_modules/@types/react';
import * as React from 'react';
import {useColorScheme} from 'react-native-appearance';
import { dark, light } from '../theme';
import t from '../theme'

export const ThemeContext = React.createContext({
    isDark: false,
    colors: light,
    setScheme: (scheme: string) => {}
});

export interface DEFAULT_THEME {
    isDark: boolean,
    colors: any,
    setScheme: (scheme: string) => void,
}

export const ThemeProvider = ({children} : {children: any}) => {
    // Getting the device color theme, this will also work with react-native-web
    const colorScheme = useColorScheme(); // Can be dark | light | no-preference

    /*
    * To enable changing the app theme dynamicly in the app (run-time)
    * we're gonna use useState so we can override the default device theme
    */
    const [isDark, setIsDark] = React.useState(colorScheme === "dark");

    // Listening to changes of device appearance while in run-time
    React.useEffect(() => {
        setIsDark(colorScheme === "dark");
    }, [colorScheme]);

    const defaultTheme : DEFAULT_THEME = {
        isDark,
        // Chaning color schemes according to theme
        colors: isDark ? dark : light,
        // Overrides the isDark value will cause re-render inside the context.  
        setScheme: (scheme : string) => setIsDark(scheme === "dark"),
    };

  return (
        <ThemeContext.Provider value={defaultTheme}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useTheme = () => React.useContext(ThemeContext);