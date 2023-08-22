import { createContext, useReducer } from "react";

//themecontext
const ThemeContext = createContext ();

let ThemeReducer = (state, action) => {
//   console.log(state,action);
switch (action.type){
     case "CHANGE_THEME" : 
           return {...state , theme : action.payload};//{ theme: 'light'}//overide ဖစ်ပီး {theme: 'dark'}
     default:
           return state;// {theme : 'light'}
   }
}

//themecontextprovider component
const ThemeContextProvider = ({children}) => {

    let [ state , dispatch ]= useReducer(ThemeReducer,{
        theme: 'light'
     })

    let changeTheme = () => {
        //action -> type + payload -> {type,payload}
        dispatch({type : "CHANGE_THEME" , payload : 'dark'})
     }

    return (
        <ThemeContext.Provider value = {{ ...state , changeTheme }} >
           {children}
        </ThemeContext.Provider>
    )
}
export {ThemeContext,ThemeContextProvider}

