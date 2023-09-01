import { signOut } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase'

const useSignout = () => {

   const [error,setError] = useState(null)
   const [loading,setLoading] = useState (false)

   const logout = async () => {
      try{
        setLoading(true);
        let res  = await signOut(auth)
        setError('')
        setLoading(false);
        return res.user;  // console.log(res.user);
      }catch(e) {
        setLoading(false);
        setError(e.message);
      }
   }

  return {error,loading,logout}
}

export default useSignout
