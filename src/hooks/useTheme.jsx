import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

const useTheme = () => {
 let contexts =  useContext(ThemeContext)//{theme : 'dark'}
  if (contexts === undefined){
    new Error('theme context should be only used in ThemeContextProvider')
  }
  return contexts; //{theme : 'dark' , changeTheme}
}

export default useTheme 
