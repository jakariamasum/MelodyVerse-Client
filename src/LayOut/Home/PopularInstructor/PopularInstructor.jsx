import { useEffect, useState } from 'react';

const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/instructors?sort=asc')
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8 lg:mx-32">
            {instructors.map((instructor) => (
                <div
                    key={instructor.email}
                    className="p-4 bg-white rounded shadow-md"
                >
                    <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-lg font-medium text-center mb-2">
                        {instructor.name}
                    </h3>
                    {instructor.numClasses && (
                        <p className="text-sm text-gray-600 text-center mb-2">
                            Number of Classes Taken: {instructor.numClasses}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PopularInstructor;
