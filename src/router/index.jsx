import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx"; //need for router
import Layout from "../pages/Layouts/Layout.jsx";
import Create from "../pages/Create.jsx";
import Search from "../pages/Search.jsx";
import BookDetail from "../pages/BookDetail.jsx";

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
      }

    ],
  },
]);
export default router;
