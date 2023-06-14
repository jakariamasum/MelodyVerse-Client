import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    data.status='pending';
    data.email=user.email; 
    data.name=user.displayName;
    data.feedBack='';
    console.log(data)

    fetch('http://localhost:5000/add-class',{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.insertedId)
                {
                  Swal.fire({
                    position: 'text-center',
                    icon: 'success',
                    title: 'New Class Added',
                    showConfirmButton: false,
                    timer: 1500
                });
                }
    })

     reset();
  };

  // Get the logged in user/instructor details
  const instructorName = user.displayName; // Replace with the displayName of the logged in user/instructor
  const instructorEmail = user.email; // Replace with the email of the logged in user/instructor

  return (
    <div className="w-1/2 mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Add Class</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="className">
            Class Name
          </label>
          <input
            className="w-full border border-gray-300 px-3 py-2 rounded"
            type="text"
            id="className"
            {...register('className', { required: true })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="classImage">
            Class Image
          </label>
          <input
            className="w-full border border-gray-300 px-3 py-2 rounded"
            type="text"
            id="classImage"
            {...register('classImage', { required: true })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="instructorName">
            Instructor Name
          </label>
          <input
            className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100"
            type="text"
            id="instructorName"
            value={instructorName}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="instructorEmail">
            Instructor Email
          </label>
          <input
            className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100"
            type="text"
            id="instructorEmail"
            value={instructorEmail}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="availableSeats">
            Available Seats
          </label>
          <input
            className="w-full border border-gray-300 px-3 py-2 rounded"
            type="number"
            id="availableSeats"
            {...register('availableSeats', { required: true })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="w-full border border-gray-300 px-3 py-2 rounded"
            type="number"
            id="price"
            {...register('price', { required: true })}
          />
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddClass;
