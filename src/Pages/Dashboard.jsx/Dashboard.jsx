import { Link, Outlet } from "react-router-dom";
import useAdminVerification from "../../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useState } from "react";

const Dashboard = () => {
    const [userRole,setUserRole]=useState('student')
    const {user}=useContext(AuthContext)

    fetch(`http://localhost:5000/students?email=${user?.email}`)
  .then(res=>res.json())
  .then(data=>setUserRole(data))
    // console.log(userRole)
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet/>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    
                    
                    
                    {
                        userRole==='student'?<>
                        <li><Link to='/student-dashboard/selected'>My Selected Classes</Link></li>
                        <li><Link to='/student-dashboard/enrolled'>My Enrolled Classes</Link></li>
                        </>: userRole==='admin'? <>
                        <li><Link to='/admin-dashboard/classes'>Manage Classes</Link></li>
                        <li><Link to='/admin-dashboard/allusers'>Manage Users</Link></li>
                        </>: <>
                        <li><Link to='/instructor-dashboard/add-class'>Add Classes</Link></li>
                        <li><Link to='/instructor-dashboard/classes'>My Classes</Link></li>
                        </>
                    }



                    <div className="divider"></div>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/instructors'>Instructors </Link></li>
                    <li><Link to='/classes'>Classes </Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;