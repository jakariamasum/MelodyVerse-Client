import { useEffect, useState } from 'react';

const PopularClass = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch('https://music-school-server-pearl.vercel.app/classes?sort=asc')
      .then(res => res.json())
      .then(data => setClasses(data.slice(0, 6)));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-10">Popular Class</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8 mx-4 md:mx-8 lg:mx-32">
        {classes.map(classItem => (
          <div key={classItem._id} className="p-4 bg-white rounded shadow-md">
            <img
              src={classItem.classImage}
              alt={classItem.className}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-medium mb-2">{classItem.className}</h3>
            <p className="text-gray-600 mb-2">Instructor: {classItem.name}</p>
            <p className="text-gray-600 mb-2">Available Seats: {classItem.availableSeats}</p>
            <p className="text-gray-600 mb-4">Price: {classItem.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClass;
