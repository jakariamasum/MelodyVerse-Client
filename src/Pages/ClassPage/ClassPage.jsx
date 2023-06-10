import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const ClassesPage = () => {
  const {user}=useContext(AuthContext)

    const [classes,setClasses]=useState([]); 

    useEffect(()=>{
        fetch('http://localhost:5000/classes')
        .then(res=>res.json())
        .then(data=>setClasses(data))
    },[])

    const handleselect=(item)=>{
      console.log(item)
      item.email=user?.email;
      item.selectId=item._id;
      delete item._id;
      fetch('http://localhost:5000/selected',{
        method: 'POST', 
        headers: {
          'content-type': "application/json"
        },
        body: JSON.stringify(item)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.insertedId)
                {
                  Swal.fire({
                    position: 'text-center',
                    icon: 'success',
                    title: 'Selected',
                    showConfirmButton: false,
                    timer: 1500
                });
                }
      })
    }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8 lg: mx-32 ">
      {classes.map((classItem) => (
        <div
          key={classItem.id}
          className={`p-4 bg-white rounded shadow-md ${
            classItem.availableSeats === 0 ? 'bg-red-200' : ''
          }`}
        >
          <img
            src={classItem.image}
            alt={classItem.name}
            className="w-40 h-40 object-cover rounded mb-4"
          />
          <h3 className="text-lg font-medium mb-2">{classItem.name}</h3>
          <p className="text-gray-600 mb-2">Instructor: {classItem.instructor}</p>
          <p className="text-gray-600 mb-2">Available Seats: {classItem.availableSeats}</p>
          <p className="text-gray-600 mb-4">Price: {classItem.price}</p>
          <button onClick={()=>handleselect(classItem)}
            disabled={classItem.availableSeats === 0}
            className={`w-full py-2 px-4 rounded ${
              classItem.availableSeats === 0 ? 'bg-red-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Select
          </button>
        </div>
      ))}
    </div>
  );
};

export default ClassesPage;
