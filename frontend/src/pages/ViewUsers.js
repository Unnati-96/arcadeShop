import {useEffect, useState} from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {FaEdit} from "react-icons/fa";
import Heading from "../components/Heading";
import EditUser from "./EditUser";
import {deleteUser, getUser} from "../context/UserContext";
// import {IoMdEye} from "react-icons/io";

const ViewDevices = () => {
    const [users, setUsers] = useState([]);

    useEffect( () => {
        const fetchUser = async () => {
            const data = await getUser();
            if(data)    setUsers(data);
            else console.error("Data Fetching failed");
        }

        fetchUser();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    const handleDelete = async (userData) => {
        console.log('Deleted data: ', userData);
        const isDelete = await deleteUser(userData._id);
        if(isDelete) {
            console.log('Deleted user: ', isDelete);
        }else{
            console.error('User deletion failed');
        }
    };

    const handleEdit = (userData) => {
        console.log('Clicked Edit device on View Device Page with data: ', userData);
        setSelectedUser(userData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser({});
    };

    return (
        <div className="w-full p-6 bg-white rounded-lg flex flex-col">
            <Heading title="View Users List" />
            {/*Table*/}
            <div className="flex items-center justify-center mx-auto">
                <table className="border border-collapse w-full">
                    <thead>
                    <tr className="font-bold text-lg bg-gray-200 text-center">
                        <td className="px-8 py-3 w-fit">Name</td>
                        <td className="px-8 py-3 w-fit">Email</td>
                        <td className="px-8 py-3 w-fit">Phone</td>
                        <td className="px-8 py-3 w-fit">Password</td>
                        <td className="px-8 py-3 w-fit">Role</td>
                        <td className="px-5 py-3 w-fit">Edit</td>
                        <td className="px-5 py-3 w-fit">Delete</td>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.email} className="border text-center hover:bg-green-100">
                            <td className="px-8 py-3 w-fit">{user.name}</td>
                            <td className="px-8 py-3 w-fit">{user.email}</td>
                            <td className="px-8 py-3 w-fit">{user.phone}</td>
                            <td className="px-8 py-3 w-fit flex items-center justify-evenly space-x-4"><span>{ user.password}</span></td>
                            <td className="px-8 py-3 w-fit">{user.role}</td>
                            <td className="px-5 py-3">
                                <button className="text-blue-500 hover:scale-125 text-xl" onClick={() => handleEdit(user)}><FaEdit /></button>
                            </td>
                            <td className="px-5 py-3">
                                <button className="text-red-500 hover:scale-125 text-xl" onClick={() => handleDelete(user)}><RiDeleteBin5Fill /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && selectedUser && (
                <>
                    {/* Overlay background to disable background interaction */}
                    <div className="fixed inset-0 bg-gray-800 opacity-50 z-50"></div>
                    <EditUser data={selectedUser} onClose={handleCloseModal} />

                </>
            )}

        </div>
    );
};

export default ViewDevices;
