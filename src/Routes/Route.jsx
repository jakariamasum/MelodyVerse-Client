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
import AddedClasses from "../Pages/AddesClasses/AddedClasses";
import ManageClass from "../Pages/Admin/ManageClass/ManageClass";
import ManageUsers from "../Pages/Admin/ManageUsers/ManageUsers";
import PrivateRoute from "./PrivateRoute";

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
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children:[
        {
          path: '/student-dashboard/selected',
          element: <PrivateRoute><SelectedClass/></PrivateRoute>
        },
        {
          path: '/student-dashboard/:payment',
          element: <PrivateRoute><Payment/></PrivateRoute>
        }
      ]
    },
    {
      path: '/instructor-dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children:[
        {
          path: '/instructor-dashboard/add-class',
          element: <PrivateRoute><AddClass/></PrivateRoute>
        },
        {
          path: '/instructor-dashboard/classes',
          element: <PrivateRoute><AddedClasses/></PrivateRoute>
        }
      ]
    },
    {
      path: '/admin-dashboard', 
      element:<PrivateRoute><Dashboard/></PrivateRoute>,
      children: [
        {
          path: '/admin-dashboard/classes', 
          element: <PrivateRoute><ManageClass/></PrivateRoute>
        },
        {
          path: '/admin-dashboard/allusers',
          element: <PrivateRoute><ManageUsers/></PrivateRoute>
        }
      ]
    }
    
  ]);
