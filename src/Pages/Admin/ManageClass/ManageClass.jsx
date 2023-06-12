import { useContext, useEffect, useState } from "react";
import { IoMdRefresh } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { BsCheckCircle } from 'react-icons/bs'
import { FaCommentAlt } from 'react-icons/fa'
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";

const ManageClass = () => {
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/add-class`)
            .then((res) => res.json())
            .then((data) => setClasses(data));
    }, [user?.email]);

    const handleApprove = (id) => {
        fetch(`http://localhost:5000/students/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                role: "admin",
            }),
        })
            .then((res) => res.json())
            .then((updatedUser) => {
                // Update the user in the classes state
                Swal.fire({
                    title: 'Class has been approved',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                setClasses((prevClasses) =>
                    prevClasses.map((classItem) =>
                        classItem._id === id ? { ...classItem, status: "approved" } : classItem
                    )
                );
            })
            .catch((error) => {
                console.log("Error updating user:", error);
            });
    }

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
                        <th>Instructor Email</th>
                        <th>Price</th>
                        <th>Seats</th>
                        <th>Status</th>
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
                            <td>{classItem.email}</td>
                            <td>${classItem.price}</td>
                            <td>{classItem.availableSeats}</td>
                            <td className="text-yellow-400">{classItem.status}</td>
                            <td className="flex items-center gap-1">
                                <button onClick={() => handleApprove(classItem._id)}
                                    disabled={classItem.status === "approved"}
                                    className="btn btn-warning mr-2 font-semibold border-none text-white bg-green-400 hover:bg-purple-500"><BsCheckCircle size={20} /> Approve</button>
                                <button className="btn btn-warning mr-2 font-semibold border-none text-white bg-red-400 hover:bg-purple-500"><RxCross2 size={20} /> Deny</button>
                                <button className="btn btn-warning mr-2 font-semibold border-none text-white bg-orange-400 hover:bg-purple-500"><FaCommentAlt size={20} /> FeedBack</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageClass;
