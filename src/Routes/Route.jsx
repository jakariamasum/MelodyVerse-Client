import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../LayOut/Home/Home/Home";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
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
        }
      ]
    },
  ]);
