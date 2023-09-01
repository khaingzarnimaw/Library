import { createContext } from "react";

let AuthContext = createContext() //1 context api

import React from 'react'
// 2 context porvider conponent
//rafc-> AuthContextProvider/<AuthContext.Provider>

// const AuthContextProvider = ({children}) => {
//   return (
//     <AuthContext.Provider value={{user:'kznm'}}>
//         {children}
//     </AuthContext.Provider>      
//   )
// }
// export default AuthContextProvider

export default function AuthContextProvider({children}){
    return (
      <AuthContext.Provider value={{user:'kznm'}}>
        {children}
      </AuthContext.Provider>
    )
}
export { AuthContext, AuthContextProvider};
