import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase'
const useFirestore = () => {

   let getCollection = (colName,_q) => {
    let qRef = useRef(_q).current
    //  console.log(qRef);
    let[error,setError] = useState('');
    let[data,setData] = useState([]);//books
    let[loading,setLoading] = useState(false);

    useEffect(function(){
        // console.log(qRef);
        setLoading(true)
         let ref = collection(db , colName);//fire base//colName = books
         let qureires = [];
         if(qRef){
            qureires.push(where(...qRef)) 
         }
          qureires.push(orderBy('date','desc'));//uid asc , data desc -> index
             let q = query(ref, ...qureires) 

         onSnapshot(q,docs => {
          if(docs.empty){
           setError('no documents found');
           setLoading(false)
          } else {
      
           let collectionDatas = [];//collectionDatas= books
           docs.forEach( doc =>{
             let document = {id : doc.id ,...doc.data()} 
             collectionDatas.push(document) //document=book
           } )
           setData(collectionDatas);
           setLoading(false)
           setError('');
          }     
          })     
      },[qRef])
    return {error,data,loading}
   }


   //document တခုချင်းဆီ ဆွဲထုတ်တဲ့ function//BookDetail ထဲက
   let getDocument = (colName,id)=>{
    let[error,setError] = useState('');
    let[data,setData] = useState(null);
    let[loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
         let ref = doc(db , colName, id)
        //  getDoc(ref).then()
        onSnapshot(ref,doc =>{
          // console.log(doc.exists());
          if (doc.exists()){
            let document = {id : doc.id , ...doc.data()}
            setData(document);
            setLoading(false)
            setError('');
          } else {
            setError('no document found')
            setLoading(false)
          } 
         })
      },[id])
      return {error,loading,data};
   }

   let addCollection = async (colName , data) => {
     data.date = serverTimestamp();
      let ref = collection(db, colName);
       return addDoc(ref,data)
   }

   let deleteDocument= async (colName,id) => {        
         let ref = doc(db ,colName ,id)
         return deleteDoc(ref);
   }

   let updateDocument = async(colName , id ,data)=> {
        data.date = serverTimestamp();
         let ref = doc(db , colName , id)
         return updateDoc(ref, data);
   }

  return {getCollection,addCollection,deleteDocument,updateDocument,getDocument};
    
  
}

export default useFirestore
