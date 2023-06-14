import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const InstructorsPage = () => {
  const [instructors,setInstructors]=useState([]); 
  useEffect(()=>{
    fetch('http://localhost:5000/students?instructor=instructor')
    .then(res=>res.json())
    .then(data=>setInstructors(data))
  },[])
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8 lg:mx-32">
      {instructors.map((instructor) => (
        <div
          key={instructor.email}
          className="p-4 bg-white rounded shadow-md"
        >
          <img
            src={instructor.photoURL}
            alt={instructor.name}
            className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-medium text-center mb-2">
            {instructor.name}
          </h3>
          <p className="text-sm text-gray-600 text-center mb-2">
            {instructor.email}
          </p>
          
          <Link
            to={`/instructors/${instructor.email}/classes`}
            className="block text-center text-blue-500 font-medium"
          >
            See Classes
          </Link>
        </div>
      ))}
    </div>
  );
};

export default InstructorsPage;
