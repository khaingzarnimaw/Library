import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/create",
          element: <Create/>,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/Books/:id",
          element: <BookDetail/>,
        },
        {
          path:"/edit/:id",
          element: <Create/>
        },
        {
          path:"/register",
          element: <Register/>
        },
        {
          path:"/login",
          element: <Login/>
        }
  
      ],
    },
  ]);

  let {authReady} = useContext(AuthContext)

  return (
     authReady &&  <RouterProvider router={router}/>
  )
}

