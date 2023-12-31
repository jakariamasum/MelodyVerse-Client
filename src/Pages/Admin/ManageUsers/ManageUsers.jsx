import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { TiUserAdd } from 'react-icons/ti';
import { FaUserCheck } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`https://music-school-server-pearl.vercel.app/students`)
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, [user?.email]);
  


  const handleMakeAdmin = (id) => {
    fetch(`https://music-school-server-pearl.vercel.app/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "admin",
      }),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        Swal.fire({
            title: 'User role updated into admin',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        setClasses((prevClasses) =>
        prevClasses.map((classItem) =>
          classItem._id === id ? { ...classItem, role: "admin" } : classItem
        )
      );
      })
      .catch((error) => {
        console.log("Error updating user:", error);
      });
  };

  const handleMakeInstructor = (id) => {

    fetch(`https://music-school-server-pearl.vercel.app/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "instructor",
      }),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        // Update the user in the classes state
        Swal.fire({
            title: 'User role updated into instructor',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        setClasses((prevClasses) =>
        prevClasses.map((classItem) =>
          classItem._id === id ? { ...classItem, role: "instructor" } : classItem
        )
      );
      })
      .catch((error) => {
        console.log("Error updating user:", error);
      });


    console.log(`Make instructor clicked for user with ID: ${id}`);
  };

  return (
    <div className="my-12">
      <h1 className="text-2xl font-bold mb-4">
        Total Users: {classes.length}
      </h1>
      <table className="table text-center">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Image</th>
            <th>Name</th>
            <th>Instructor Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>



          {classes.map((classItem, index) => (
            <tr key={classItem.id}>
              <td>{index + 1}</td>
              <td>
                <img src={classItem.photoURL} alt={classItem.name} className="mask mask-squircle w-12 h-12" />
              </td>
              <td>{classItem.name}</td>
              <td><p>{classItem.email}</p></td>
              <td>{classItem.role}</td>
              <td className="flex items-center">
                <button
                  className="btn btn-warning mr-2 border-none text-white bg-green-400 hover:bg-purple-500"
                  disabled={classItem.role === "admin"}
                  onClick={() => handleMakeAdmin(classItem._id)}
                >
                  <TiUserAdd size={25} /> Make Admin
                </button>
                <button
                  className="btn  mr-2 border-none text-white bg-orange-400 hover:bg-gray-600"
                  disabled={classItem.role === "instructor"}
                  onClick={() => handleMakeInstructor(classItem._id)}
                >
                  <FaUserCheck size={20} /> Make Instructor
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
