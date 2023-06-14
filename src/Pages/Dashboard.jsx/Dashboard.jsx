import { Link, Outlet } from "react-router-dom";
import useAdminVerification from "../../hooks/useAdmin";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import {FaChalkboardTeacher,FaBookOpen,FaUserCog,FaCogs,FaUserGraduate} from 'react-icons/fa'
import {AiFillHome} from 'react-icons/ai'
import { TiPlusOutline, TiTick } from "react-icons/ti";

const Dashboard = () => {
    const [userRole, setUserRole] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://music-school-server-pearl.vercel.app/students?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setUserRole(data.role));
    }, [user]);

    console.log(userRole);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {userRole === 'student' && (
                        <>
                            <li><Link to='/student-dashboard/selected'><TiTick size={20}/> My Selected Classes</Link></li>
                            <li><Link to='/student-dashboard/enrolled'><FaChalkboardTeacher size={20}/> My Enrolled Classes</Link></li>
                        </>
                    )}
                    {userRole === 'admin' && (
                        <>
                            <li><Link to='/admin-dashboard/classes'><FaCogs size={20}/> Manage Classes</Link></li>
                            <li><Link to='/admin-dashboard/allusers'><FaUserCog size={20}/> Manage Users</Link></li>
                        </>
                    )}
                    {userRole === 'instructor' && (
                        <>
                            <li><Link to='/instructor-dashboard/add-class'><TiPlusOutline size={20}/> Add Classes</Link></li>
                            <li><Link to='/instructor-dashboard/classes'><FaUserGraduate size={20}/> My Classes</Link></li>
                        </>
                    )}
                    <div className="divider"></div>
                    <li><Link to='/'><AiFillHome size={20}/> Home</Link></li>
                    <li><Link to='/instructors'><FaChalkboardTeacher size={20}/> Instructors</Link></li>
                    <li><Link to='/classes'><FaBookOpen size={20}/> Classes</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;