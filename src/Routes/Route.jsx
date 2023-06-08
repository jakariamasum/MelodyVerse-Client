import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../LayOut/Main";
import { Home } from "@mui/icons-material";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/', 
            element: <Home/>
        }
      ]
    },
  ]);
