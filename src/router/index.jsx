import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx"; //need for router
import Layout from "../pages/Layouts/Layout.jsx";
import Create from "../pages/Create.jsx";
import Search from "../pages/Search.jsx";
import BookDetail from "../pages/BookDetail.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/login.jsx";
import React, { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function index() {

  let {authReady , user } = useContext(AuthContext)

  const isAuthenticated = Boolean(user) ;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/create",
          element:isAuthenticated ? <Create/> : <Navigate to="/login"/>
        },
        {
          path: "/search",
          element:isAuthenticated ?  <Search /> : <Navigate to="/login"/>
        },
        {
          path: "",
          element: isAuthenticated ? <Home /> : <Navigate to="/login"/>
        },
        {
          path: "/Books/:id",
          element:isAuthenticated ? <BookDetail/> :  <Navigate to="/login"/> 
        },
        {
          path:"/edit/:id",
          element: isAuthenticated ? <Create/> :  <Navigate to="/login"/> 
        },
        {
          path:"/register",
          element: !isAuthenticated ?<Register/> :<Navigate to="/"/>
        },
        {
          path:"/login",
          element: !isAuthenticated ? <Login/> : <Navigate to="/"/>
        }
  
      ],
    },
  ]);

  return (
     authReady &&  <RouterProvider router={router}/>
  )
}

