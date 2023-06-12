
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
const Navbar = () => {
  const { user,logOut } = useContext(AuthContext)
  // Check user
  const userRole = localStorage.getItem('token')
  const handleLogOut=()=>{
    logOut()
    .then(res=>{
      // localStorage.clear();
    })
    .catch(error=>({}))
  }
  return (
    <nav className="bg-gray-100 shadow-lg ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-lg text-blue-500">Logo</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/instructors" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Instructors</Link>
                <Link to="/classes" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Classes</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <>
                  {/* TODO: add user image */}
                  {userRole === 'admin' && (
                    <Link to="/admin-dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Admin Dashboard</Link>
                  )}
                  {userRole === 'student' && (
                    <Link to="/student-dashboard/selected" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Student Dashboard</Link>
                  )}
                  {userRole === 'instructor' && (
                    <Link to="/instructor-dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Instructor Dashboard</Link>
                  )}
                  <img src={''} alt="User Profile" className="h-8 w-8 rounded-full" />
                  <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium" onClick={handleLogOut}>LogOut</Link>
                </>
              ) : (
                <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
