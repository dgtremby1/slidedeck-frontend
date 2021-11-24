// Import CSS
// Import major dependencies
import React, { createContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// Import components
// Import icons
// Import API and static content
import themes from "../static/themes";
import storage from "../static/storage";


const ThemeContext = createContext();

const ThemeProvider = (props) => {

    const lastTheme = storage.get("theme");
    const defaultTheme = themes[0];
    const [theme, setTheme] = useState(lastTheme ? lastTheme : defaultTheme);
    /**
     * Adds/remove the appropriate theme classes 
     * to root <html> element.
     * @param {Object} theme Unique string of new theme
     */
    const updateThemeClasses = (theme) => {
        const html = window.document.documentElement;
        for(let i = 0; i < themes.length; i++) {
            html.classList.remove(themes[i].id);
        }
        html.classList.add(theme.id);
    }
    useEffect(() => {
        storage.set("theme", theme);
        updateThemeClasses(theme);
    }, [theme]);

    return(
        <ThemeContext.Provider value={{
            theme: theme,
            setTheme: setTheme
        }}>
            <Helmet>
                <meta name="theme-color" content={theme.color}/>
            </Helmet>
            {props.children}
        </ThemeContext.Provider>
    )
}

const Theme = {
    Context: ThemeContext,
    Provider: ThemeProvider,
    list: themes 
}

export default Theme;
