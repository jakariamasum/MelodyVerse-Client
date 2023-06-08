import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../LayOut/Main";
import { Home } from "@mui/icons-material";
import Login from "../Pages/Login/Login";

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
        }
      ]
    },
  ]);
