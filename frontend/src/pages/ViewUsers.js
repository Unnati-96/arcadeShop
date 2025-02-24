import {useEffect, useState} from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {FaEdit} from "react-icons/fa";
import Heading from "../components/Heading";
import EditUser from "./EditUser";
import {useNavigate} from "react-router-dom";
import {deleteUser, getUser } from "../services/userService";
import Error from "../components/Error";
import Toast from "../components/Toast";

const ViewDevices = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [toast, setToast]= useState(null);
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
    useEffect( () => {
        const fetchUser = async () => {
            try {
                setError(null);
                const data = await getUser();
                if (data) setUsers(data);
            }
            catch(error) {
                setError(error.message || "An unknown error occurred");
            }
        }


        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(localStorage.getItem('user')));
        }


        fetchUser();
    }, [error, toast]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    const handleDelete = async (userData) => {
        try {
            setError(null);
            const deletedUser = await deleteUser(userData);
            if(deletedUser) {
                // console.log('Deleted user: ', deletedUser);
                // navigate('/user/view');
                setToast("User Deleted Successsfully")
            }
        }catch(error){
            // console.error('Error: ', error.message);
            setError(error.message || 'An Unknown error occured.')
            setToast("Failed to delete user.")
        }
    };

    const handleEdit = (userData) => {
        // open the Edit Modal for editing user
        setSelectedUser(userData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser({});
    };
    const handleToast = (msg) => {
        setToast(msg);
    }

    return (
        <div className="w-full p-6 bg-white rounded-lg flex flex-col">
            <Heading title="View Users List" />
            {/*<p>Current user Tsting: {currentUser}</p>*/}
            {error && <Error error={error} />}
            {toast && <Toast message={toast} />}
            {/*Table*/}
            <div className="flex items-center justify-center mx-auto">
                <table className="border border-collapse w-full">
                    <thead>
                    <tr className="font-bold text-lg bg-gray-200 text-center">
                        <td className="px-8 py-3 w-fit">Name</td>
                        <td className="px-8 py-3 w-fit">Email</td>
                        <td className="px-8 py-3 w-fit">Phone</td>
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
                            <td className="px-8 py-3 w-fit">{user.phoneNo}</td>
                            {/*<td className="px-8 py-3 w-fit flex items-center justify-evenly space-x-4"><span>{ user.password}</span></td>*/}
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
                    <EditUser data={selectedUser} onClose={handleCloseModal} toast={handleToast} />

                </>
            )}

        </div>
    );
};

export default ViewDevices;
