import { useContext, useEffect, useState } from "react";
import { IoMdRefresh } from 'react-icons/io'
import { AuthContext } from "../../Provider/AuthProvider";

const AddedClasses = () => {
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch(`https://music-school-server-pearl.vercel.app/add-class?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => setClasses(data));
    }, [user?.email]);


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                Total Class Add: {classes.length}
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
                        <th>Total Enrollment</th>
                        <th>Status</th>
                        <th>FeedBack</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classItem, index) => (
                        <tr key={classItem.id}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={classItem.classImage} alt={classItem.className} className="mask mask-squircle w-12 h-12" />
                            </td>
                            <td>{classItem.name}</td>
                            <td>{classItem.instructor}</td>
                            <td>${classItem.price}</td>
                            <td>{classItem.availableSeats}</td>
                            <td>0</td>
                            <td className="text-yellow-400">{classItem.status}</td>
                            <td>{classItem.feedBack? classItem.feedBack:''}</td>
                            <td>
                                <button className="btn btn-warning mr-2 font-semibold border-none text-white bg-green-400 hover:bg-purple-500"><IoMdRefresh size={20} /> Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddedClasses;
