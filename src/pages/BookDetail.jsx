import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BookDetail = () => {
  //dynamic id//id ကိုလက်ခံဖို့ //useParams ကိုသုံးကြစို့
  let { id } = useParams();
//   console.log(id);


//fetch data
let { data:book , loading, error} = useFetch(`http://localhost:3001/books/${id}`)

  return (
   <>
       {error && <p>{error}</p>}
       {loading && <p>loading...</p>}
       {book && (
         <h1>{book.title}</h1>
       )}
   </>
  )
};

export default BookDetail;
