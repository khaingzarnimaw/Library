import { createContext } from "react";

//themecontext
const ThemeContext = createContext ();

//themecontextprovider component
const ThemeContextProvider = ({children}) => {
    return (
        <ThemeContext.Provider value = {{theme : 'light'}} >
           {children}
        </ThemeContext.Provider>
    )
}
export {ThemeContext,ThemeContextProvider}

