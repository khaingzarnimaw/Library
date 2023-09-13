import React, { useContext } from "react";
import memory from "../assets/img/memory.jpeg";
// import useFetch from "../hooks/useFetch";
import { Link ,useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import {db} from '../firebase'
import { collection,deleteDoc,doc,getDocs, onSnapshot, orderBy, query } from "firebase/firestore";

import { useEffect,useState } from "react";
import trash from "../assets/trash.svg"
import pencil from "../assets/pencil.svg"
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "../contexts/AuthContext";

const BookList = () => {

let location = useLocation();
let params = new URLSearchParams(location.search);
// console.log(params.get('search'));
let search = params.get('search')
//  let search = 'React';
//  let { data : books , loading, error } = useFetch(`http://localhost:3000/books${search ? `?q=${search}`:''}`,"GET");

let {getCollection , deleteDocument} = useFirestore()
let {user} = useContext(AuthContext)
let {error, data : books , loading} = getCollection('books',['uid','==',user.uid])

let deleteBook = async(e,id) => {
  e.preventDefault()
  await deleteDocument('books',id)
  // console.log('hello world');
  // console.log( 'book id'+id );

  //delect fire store doc
  // let ref = doc(db,'books',id)
  // await deleteDoc(ref);//backend book delect
  // setBooks(prev => prev.filter(b => b.id !== id))//frontend book delect(ui)//update 
}

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

                <div className="flex flex-wrap justify-between items-center">
                  <div>
                  {b.categories.map((c) => (
                    <span　key={c} className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500">
                      {c}
                    </span>
                  ))}
                  </div>
                  <div className="flex space-x-5 items-center" >
                      
                      <Link to={`/edit/${b.id}`}>
                      <img src={pencil} alt="" />
                      </Link>
                       <img src={trash} alt="" onClick={(e) => deleteBook(e,b.id)} />
                  </div>
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
