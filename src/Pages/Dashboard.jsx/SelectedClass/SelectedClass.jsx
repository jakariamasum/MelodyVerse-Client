import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import {AiFillDelete} from 'react-icons/ai'

const SelectedClass = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/selected?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, [user?.email]);

  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">
            Total Selected: {classes.length}
        </h1>
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
            <tr key={classItem.id}>
              <td>{index + 1}</td>
              <td>
              <img src={classItem.image} alt={classItem.name} className="mask mask-squircle w-12 h-12" />
              </td>
              <td>{classItem.name}</td>
              <td>{classItem.instructor}</td>
              <td>${classItem.price}</td>
              <td>{classItem.availableSeats}</td>
              <td className="flex items-center">
                <button className="btn btn-warning mr-2 border-none text-white bg-red-400 hover:bg-purple-500"><AiFillDelete size={20}/> Delete</button>
                <button className="btn btn-success">Pay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedClass;
