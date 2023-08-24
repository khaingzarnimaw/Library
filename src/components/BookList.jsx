import React from "react";
import memory from "../assets/img/memory.jpeg";
// import useFetch from "../hooks/useFetch";
import { Link ,useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import {db} from '../firebase'
import { collection,getDocs } from "firebase/firestore";

import { useEffect,useState } from "react";

const BookList = () => {

let location = useLocation();
let params = new URLSearchParams(location.search);
// console.log(params.get('search'));
let search = params.get('search')
//  let search = 'React';
//  let { data : books , loading, error } = useFetch(`http://localhost:3000/books${search ? `?q=${search}`:''}`,"GET");

//for firebase
let[error,setError] = useState('');
let[books,setBooks] = useState([]);
let[loading,setLoading] = useState(false);

//for firebase
useEffect(function(){
  setLoading(true)
   let ref = collection(db,'books');
   getDocs(ref).then(docs => {
     if(docs.empty){
      setError('no documents found');
      setLoading(false)
     }else {

      let books = [];
      docs.forEach(doc =>{
        let book = {id : doc.id ,...doc.data()} 
        books.push(book)
      } )
      setBooks(books);
      setLoading(false)
      setError('');
     }     
     })     
},[])




  if (error) {
    return <p>{error}</p>;
  }

  let {isDark} = useTheme();

  return (
    <div>
        {loading && <p>loading ...</p>}
        {/* book list */}
        
      { !!books && (
           <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-3">
          {books.map((b) => (
           <Link to={`/books/${b.id}`}  key={b.id}>
            <div className={`p-4 border border-1 min-h-[420px] ${isDark ? 'bg-dcard border-primary text-white' : ''}`}>
            
              <img src={memory} alt="" className="mx-auto" />
              <div className="text-center space-y-2 mt-3">
                <h1>{b.title}</h1>
                <p>{b.description}</p>
                {/* genres */}
                <div className="flex flex-wrap ">
                  {b.categories.map((c) => (
                    <span　key={c} className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
           </Link>
          ))}
        </div>
      )}
      { books && !books.length && ( <p className="text-center text-xl text-gray-500">No Search Results Found</p>)}
    </div>
  );
};

export default BookList;
