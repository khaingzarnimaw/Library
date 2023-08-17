import { useEffect, useState } from "react";

function useFetch(url , method = "Get") {//63
  let [data, setData] = useState(null);
  let [postData,setPostData]= useState(null);//
  let [loading, setLoading] = useState(false); 
  let [error, setError] = useState(null);
//   let options = useRef(_options).current;

  useEffect(() => {
    // console.log(options);
    let abortController = new AbortController();
    let signal = abortController.signal;

    let options ={
      signal,
      method
    };
    setLoading(true);

    let fetchData = () => {//ပြင်
      // fetch(url, { signal,method })
      fetch(url, options)//get method နဲ့သွားနေတာပါ//post method ၀င်လာ
      .then(res => {
        if (!res.ok) {
          throw Error("something went wrong");
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setError(null);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
      });
    }

    if(method === "POST" && postData){
      // console.log(postData);//data get
      options = {
        ...options,
       headers: {
        "Content-Type" : "application/json",
       },
       body : JSON.stringify(postData)
      }
      fetchData()
    }
    if(method === "GET"){
      fetchData();
    }


     //cleanup function
    return () => {
      abortController.abort();
    };
  }, [url, postData]);

  return { setPostData ,data, loading, error };
}
export default useFetch;
