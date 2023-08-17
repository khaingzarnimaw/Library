import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import shin1img from "../assets/img/shin1.jpeg"
const BookDetail = () => {
  //dynamic id//id ကိုလက်ခံဖို့ //useParams ကိုသုံးကြစို့
  let { id } = useParams();
//   console.log(id);


//fetch data
let { data:book , loading, error} = useFetch(`http://localhost:3000/books/${id}`,"GET")

  return (
   <>
       {error && <p>{error}</p>}
       {loading && <p>loading...</p>}
       {book && (
         <div className="grid grid-cols-2">
          <div>
            <img src={shin1img} alt="" className=" w-[60%]"/>
          </div>
          <div className=" space-y-4">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <div className="space-x-3">
               {book.categories.map(category => (
                <span className="bg-blue-500 text-white rounded-full text-sm px-2 py-1" key={category}>{category}</span>
               ))
              }
            </div>
            <p>
              {book.description}
            </p>
          </div>
         </div>
       )}
   </>
  )
};

export default BookDetail;
