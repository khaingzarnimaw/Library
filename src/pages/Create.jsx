import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";//63
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "../contexts/AuthContext";


const Create = () => {
  let{id} = useParams();//edit form
  let[title,setTitle] = useState('')
  let[link,setLink] = useState('');//aps
  let[description,setDescription] = useState('')
  let[newCategory,setNewCategory] = useState('')
  let[categories,setCategories] = useState([])
  let [isEdit,setIsEdit] = useState(false)
  let[file,setFile] = useState(null);
  let[preview,setPreview] = useState('')

 let {updateDocument , addCollection}=  useFirestore();

 //fire store ကနေ 
  useEffect(()=>{
     //edit form
    if(id){
      setIsEdit(true);
      //get a book by its id
      //bookDetail copy
      let ref = doc(db , 'books', id)
       getDoc(ref).then(doc =>{
          if (doc.exists()){
            let{ title,description,categories } = doc.data()
           setTitle(title)  //  console.log(title);
           setDescription(description) //console.log(description);
           setCategories(categories) //console.log(categories);
         } 
    })
   //create form
    } 
    else {
      setIsEdit(false);
      setTitle('');
      setDescription('');
      setCategories([]);
    }
  },[])

  // let {setPostData, data: book } = useFetch('http://localhost:3000/books',"POST")//63

 let navigate = useNavigate();
  // +button 
  let addCategory = (e)=>{
    //နာမည်တူတွေထည့်မရအောင်လုပ်နည်း
    if(newCategory && categories.includes(newCategory)){
      setNewCategory('')
      return;
    }

    // console.log(newCategory);
    setCategories(prev => [newCategory,...prev])
    setNewCategory('')// clear 
  }
  //onSubmit with addbook//create button click

  let {user} = useContext(AuthContext)

  let handlePhotoChange = (e) =>{
    setFile(e.target.files[0]);
  }
  let handlePreviewImage =(file)=>{
      // console.log('file preview handle here');
      let reader = new FileReader;
      reader.readAsDataURL(file);
      reader.onload=()=>{
        setPreview(reader.result);
      }
  }
  useEffect(()=>{
    if(file){
      // console.log('preview handle');
      handlePreviewImage(file)
    }
  },[file])

  let submitForm = async (e)=>{
    e.preventDefault();
    let data = {
      title,
      link,
      description,
      categories,
      uid :user.uid
      // date : serverTimestamp()

    }
  //  setPostData(data);//console.log(data) //data ပစ်ထဲ့ js server နဲ့
  if(isEdit){
    await  updateDocument('books' , id , data)
  }else{
    await  addCollection('books' , data)
  }
  
  navigate('/');
  }
  
  // useEffect (()=>{
  //   // console.log(book)//စာအုပ် data သာ တကယ်ရှိရင် navigate လုပ်ပါ
  //   if(book){
  //     navigate('/')
  //   }
  // },[book])

  //useTheme က code ကို copy
  let { isDark } = useTheme();

  return (
   <div className="h-screen">
     <form className="w-full max-w-lg mx-auto mt-5" onSubmit={submitForm} >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password ${isDark ? 'text-white' : ''}`}
          >
            Book Title
          </label>
          <input value={title} onChange={e=> setTitle(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            placeholder="Book Title"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password ${isDark ? 'text-white' : ''}`}
          >
            Book Description
          </label>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            placeholder="Book Description"
          />
          <p className="text-gray-600 text-xs italic">
            Make it as long and as crazy as you'd like
          </p>
        </div>
      </div>
      {/* aps */}
      <div>
        <input type="text" value={link} onChange={ e => setLink(e.target.value) } 
           className="border border-gray-200"
        />

      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password ${isDark ? 'text-white' : ''}`}
          >
            Categories
          </label>
          <div className="flex items-center space-x-2">
            <input value={newCategory} onChange={e=>setNewCategory(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder=" Book Categories"
            />
            {/* +button */}
            {/* type="button" */}
            <button type="button" onClick={addCategory} className="bg-primary p-1 rounded-lg mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  text-white p-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap ">
                  {categories.map(c => (
                    <span　key={c} className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-primary">
                      {c}
                    </span>
                  ))}
                </div>
      </div>

    {/* cover photo */}
      <div className="w-full px-3 my-3 ">
          <label
            className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password ${isDark ? 'text-white' : ''}`}
          >
            Book Title
          </label>
          <input type = "file" name="" id="" onChange={handlePhotoChange} />
         {!!preview && <img src={preview} alt=""  className="my-3" width={300} height={100}/>}
        </div>

      {/* create book */}
      <button className="text-white bg-primary px-3 py-2 rounded-2xl flex  justify-center items-center gap-1 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="hidden md:block">{ isEdit ?'Update Book' : 'Create Book'}</span>
      </button>
    </form>
   </div>
  );
};

export default Create;
