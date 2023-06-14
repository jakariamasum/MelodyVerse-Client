import { useContext, useEffect, useState } from "react";
import { RxCross2 } from 'react-icons/rx'
import { BsCheckCircle } from 'react-icons/bs'
import { FaCommentAlt } from 'react-icons/fa'
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import Modal from 'react-modal';

const ManageClass = () => {
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [classId, setClassId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [feedbackContent, setFeedbackContent] = useState('');

    useEffect(() => {
        fetch(`https://music-school-server-pearl.vercel.app/add-class`)
            .then((res) => res.json())
            .then((data) => setClasses(data));
    }, [user?.email]);

    const handleApprove = (item) => {
        fetch(`https://music-school-server-pearl.vercel.app/add-class/${item._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: "approved",
            }),
        })
            .then((res) => res.json())
            .then((updatedUser) => {
                fetch('https://music-school-server-pearl.vercel.app/classes', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(item)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
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
                                    classItem._id === item._id ? { ...classItem, status: "approved" } : classItem
                                )
                            );
                        }
                    })
            })
            .catch((error) => {
                console.log("Error updating user:", error);
            });
    }
    const handleDeny = (id) => {
        fetch(`https://music-school-server-pearl.vercel.app/add-class/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: "deny",
            }),
        })
            .then((res) => res.json())
            .then((updatedUser) => {
                Swal.fire({
                    title: 'Class has been denied',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                setClasses((prevClasses) =>
                    prevClasses.map((classItem) =>
                        classItem._id === id ? { ...classItem, status: "deny" } : classItem
                    )
                );
            })
            .catch((error) => {
                console.log("Error updating user:", error);
            });
    }

    const openModal = (id) => {
        setShowModal(true);
        setClassId(id)
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const sendFeedback = () => {
        console.log(feedbackContent)
        fetch(`https://music-school-server-pearl.vercel.app/add-class/${classId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ feedBack: feedbackContent }),
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.insertedId) {
                    console.log('Feedback sent successfully');
                    setFeedbackContent('');
                    closeModal();
                }

            })
            .catch((error) => {
                console.log('Error sending feedback:', error);
            });
    };



    return (
        <div className="my-12">
            <h1 className="text-2xl font-bold mb-4">
                Total Class: {classes.length}
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
                                <img src={classItem.classImage} alt={classItem.className} className="mask mask-squircle w-12 h-12" />
                            </td>
                            <td>{classItem.className}</td>
                            <td>{classItem.name}</td>
                            <td>{classItem.email}</td>
                            <td>${classItem.price}</td>
                            <td>{classItem.availableSeats}</td>
                            <td className="text-yellow-400">{classItem.status}</td>
                            <td className="flex items-center gap-1">
                                <button onClick={() => handleApprove(classItem)}
                                    disabled={classItem.status === "approved" || classItem.status === "deny"}
                                    className="btn btn-warning mr-2 font-semibold border-none text-white bg-green-400 hover:bg-purple-500"><BsCheckCircle size={20} /> Approve</button>
                                <button onClick={() => handleDeny(classItem._id)} disabled={classItem.status === "approved" || classItem.status === "deny"} className="btn btn-warning mr-2 font-semibold border-none text-white bg-red-400 hover:bg-purple-500"><RxCross2 size={20} /> Deny</button>
                                <button onClick={() => openModal(classItem._id)} className="btn btn-warning mr-2 font-semibold border-none text-white bg-orange-400 hover:bg-purple-500"><FaCommentAlt size={20} /> FeedBack</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={showModal} onRequestClose={closeModal}

                style={{
                    content: {
                        width: '50%',
                        height: '50%',
                        margin: 'auto'
                    }
                }}

            >
                <h2 className="font-bold text-2xl">Send Feedback to Instructor</h2>
                <div className="flex flex-col justify-center mx-auto w-[350px]">
                    <textarea
                        value={feedbackContent}
                        onChange={(e) => setFeedbackContent(e.target.value)}
                        placeholder="Enter your feedback"
                        className="border my-8 p-2 border-green-300"
                    ></textarea>
                    <button className="btn btn-accent" onClick={sendFeedback}>Send</button>
                </div>
            </Modal>
        </div>
    );
};

export default ManageClass;
