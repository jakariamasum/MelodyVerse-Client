import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const SelectedClass = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/selected?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, [user?.email]);

  const handleDelete = (classId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/selected/${classId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          Swal.fire(
            'Deleted!',
            'Your class has been deleted.',
            'success'
          )
          // Filter out the deleted class from the state
          const updatedClasses = classes.filter((classItem) => classItem._id !== classId);
          setClasses(updatedClasses);
        }
      })
      .catch((error) => {
        console.log('Error deleting class:', error);
      });

      }
    })
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Total Selected: {classes.length}</h1>
      <table className="table text-center">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Image</th>
            <th>Name</th>
            <th>Instructor Name</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem, index) => (
            <tr key={classItem._id}>
              <td>{index + 1}</td>
              <td>
                <img src={classItem.image} alt={classItem.name} className="mask mask-squircle w-12 h-12" />
              </td>
              <td>{classItem.name}</td>
              <td>{classItem.instructor}</td>
              <td>${classItem.price}</td>
              <td>{classItem.availableSeats}</td>
              <td className="flex items-center">
                <button
                  className="btn btn-warning mr-2 border-none text-white bg-red-400 hover:bg-purple-500"
                  onClick={() => handleDelete(classItem._id)}
                >
                  <AiFillDelete size={20} /> Delete
                </button>
                <Link to={`/student-dashboard/${classItem._id}`}>
                  <button className="btn btn-warning btn-sm">PAY</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedClass;
