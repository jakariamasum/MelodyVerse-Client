import { useEffect, useState } from 'react';

const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/students?instructor=instructor')
            .then(res => res.json())
            .then(data => setInstructors(data.slice(0, 6)))
    }, [])
    return (
        <div className='my-16 lg:mx-32 '>
            <h1 className="text-2xl font-bold text-center my-10">Popular Instructors</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
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
                        {instructor.numClasses && (
                            <p className="text-sm text-gray-600 text-center mb-2">
                                Email: {instructor.email}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularInstructor;
