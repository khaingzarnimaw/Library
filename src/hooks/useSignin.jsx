import {  signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase'

const useSignin = () => {

   const [error,setError] = useState(null)
   const [loading,setLoading] = useState (false)

   const signIn = async (email,password) => {
      try{
        setLoading(true);
        let res  = await signInWithEmailAndPassword(auth,email,password)
        setError('')
        setLoading(false);
        return res.user;  // console.log(res.user);
      }catch(e) {
        setLoading(false);
        setError(e.message);
      }
   }

  return {error,loading,signIn}
}

export default useSignin
