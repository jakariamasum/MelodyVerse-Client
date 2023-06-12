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
import Dashboard from "../Pages/Dashboard.jsx/Dashboard";
import SelectedClass from "../Pages/Dashboard.jsx/SelectedClass/SelectedClass";
import Payment from "../Payment/payment";
import AddClass from "../Pages/AddClass/AddClass";
import ClassesPage from "../Pages/ClassPage/ClassPage";

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
    {
      path: '/student-dashboard',
      element: <Dashboard/>,
      children:[
        {
          path: '/student-dashboard/selected',
          element: <SelectedClass/>
        },
        {
          path: '/student-dashboard/:payment',
          element: <Payment/>
        }
      ]
    },
    {
      path: '/instructor-dashboard',
      element: <Dashboard/>,
      children:[
        {
          path: '/instructor-dashboard/add-class',
          element: <AddClass/>
        },
        {
          path: '/instructor-dashboard/classes',
          element: ''
        }
      ]
    }
    
  ]);
