import React from "react";
import memory from "../assets/img/memory.jpeg";
import useFetch from "../hooks/useFetch";

const BookList = () => {
  let { data : books , loading, error } = useFetch("http://localhost:3001/books");

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
        {loading && <p>loading ...</p>}
        {/* book list */}
        
      { !!books && (
           <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-3">
          {books.map((b) => (
            <div className="p-4 border border-1" key={b.id}>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
