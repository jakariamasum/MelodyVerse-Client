import { useEffect, useState } from "react";

const EnrolledClass = () => { 
    const [classes,setClasses]=useState([]); 

    useEffect(()=>{
        fetch('')
        .then(res=>res.json())
        .then(data=>setClasses(data))
    } ,[])

    return (
        <div>
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

export default EnrolledClass;