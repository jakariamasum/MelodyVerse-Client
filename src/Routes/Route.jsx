import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../LayOut/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import InstructorsPage from "../Pages/InstructorsPage/InstructorsPage";
import ClassPage from "../Pages/ClassPage/ClassPage";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <ErrorPage/>,
      children: [
        {
            path: '/', 
            element: <Home/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/register',
          element: <Register/>
        },
        {
          path: '/instructors',
          element: <InstructorsPage/>
        },
        {
          path: '/classes',
          element: <ClassPage/>
        }
      ]
    },
  ]);
