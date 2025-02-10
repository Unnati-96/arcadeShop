import React, { useEffect, useState } from "react";
import ResetButton from "../components/ResetButton";
import SubmitButton from "../components/SubmitButton";
import Heading from "../components/Heading";
import { AiFillDelete } from "react-icons/ai";
import AddUserForm from "../components/AddUserForm";
import EditModal from "../components/EditModal";
import FindUser from "./FindUser";
import { addUser } from "../services/userService";
import { getDevice } from "../services/deviceService";
import { bookDevice } from "../services/bookingService";
import { useNavigate, useLocation } from "react-router-dom"; // <-- Added useLocation import

const IssueDevice = () => {
    const navigate = useNavigate();
    const location = useLocation(); // <-- Added to access the location's state (formData)

    const [addUserModal, setAddUserModal] = useState(false);
    const [findUserModal, setFindUserModal] = useState(false);
    const [device, setDevice] = useState([]);
    const [user, setUser] = useState([]);
    const [userFormData, setUserFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "User",
        password: "Password",
    });

    const [formData, setFormData] = useState({
        groupName: "",
        systemId: "",
        users: user,
        entryTime: "",
        exitTime: "",
    });

    const [addedUsers, setAddeduser] = useState(formData.users);
    const handleAddedUsers = (u) => {
        setAddeduser(u);
        console.log("Addedusers: ", addedUsers);
    };

    const getDeviceList = async () => {
        try {
            const deviceList = await getDevice();
            setDevice(deviceList);
        } catch (error) {
            console.error("Error: ", error.message);
        }
    };

    const handleUserDataSubmit = async (submittedData) => {
        try {
            const newuser = await addUser(submittedData);
            let updateUser = [...user];
            updateUser.push(submittedData);
            setUser(updateUser);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSaveUser = (newUser) => {
        setUser([...user, ...newUser]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const bookedDevice = await bookDevice(formData);
            console.log("bookedDevice", formData);
            navigate("/inventory/billing", { state: { formData } }); // Pass formData to Billing page
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const handleReset = () => {
        setFormData({
            groupName: "",
            systemId: "",
            users: [],
            entryTime: "",
            exitTime: "",
            duration: "",
        });
    };

    const handelRemoveUser = (duser) => {
        let updatedUsers = user;
        updatedUsers = updatedUsers.filter((u) => u !== duser);
        setUser(updatedUsers);
        console.log(user);
    };

    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
        getDeviceList();

        // <-- New: Check if formData is passed via location.state
        const storedData = location.state?.formData;
        if (storedData) {
            setFormData(storedData); // Set formData if passed
        }
    }, [formData.users, user, location.state]); // <-- Added location.state as a dependency

    return (
        <div className="w-[60vw] p-6 ">
            <Heading title="Issue Device" />
            <p>Current user testing: {loggedInUser}</p>
            <form className="my-10 ml-32" onSubmit={handleSubmit}>
                {/* Group Name & System ID */}
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            Group Name
                        </label>
                        <input
                            type="text"
                            name="groupName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="XG Gamer"
                            onChange={handleChange}
                            value={formData.groupName}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            System Id
                        </label>
                        <select
                            name="systemId"
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            onChange={handleChange}
                            value={formData.systemId}
                            required
                        >
                            <option value="" disabled>Select</option>
                            {device.map((d) => (
                                <option key={d._id} value={d.systemId}>{d.systemId}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* User Selection */}
                <div className="mb-6 p-4 border border-gray-300 rounded-lg">
                    <label className="block text-gray-700 font-medium mb-2 text-left">
                        Select User:
                    </label>
                    <table className="w-full">
                        <tbody>
                        {user.map((usr, index) => (
                            <tr className="border-b flex items-center w-full" key={index}>
                                <td className="px-8 py-3">{index + 1}</td>
                                <td className="px-8 py-3 w-1/4">{usr.name}</td>
                                <td className="px-10 py-3 w-2/4">{usr.email}</td>
                                <td className="px-8 py-3 hover:cursor-pointer hover:text-red-500">
                                    <AiFillDelete onClick={() => handelRemoveUser(usr)} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="mt-5 flex items-center justify-around text-blue-600">
                        <span className="hover:cursor-pointer" onClick={() => setAddUserModal(true)}>+ Add New</span>
                        <span className="hover:cursor-pointer" onClick={() => setFindUserModal(true)}>+ Add Existing User</span>
                    </div>
                </div>

                {/* Entry Time & Exit Time */}
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            Entry Time
                        </label>
                        <input
                            type="datetime-local"
                            name="entryTime"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            onChange={handleChange}
                            value={formData.entryTime}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            Exit Time
                        </label>
                        <input
                            type="datetime-local"
                            name="exitTime"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            onChange={handleChange}
                            value={formData.exitTime}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex items-center justify-center space-x-10">
                    <ResetButton onReset={handleReset} />
                    <SubmitButton text="Proceed"/>
                </div>
            </form>

            {/* Modal */}
            {addUserModal && (
                <>
                    <div className="fixed inset-0 bg-gray-800 opacity-50 z-50"></div>
                    <EditModal onClose={() => setAddUserModal(false)}>
                        <Heading title="Add User Details" />
                        <AddUserForm initialData={userFormData} onSubmit={handleUserDataSubmit} disabledInput={["role"]}>
                            <ResetButton text="Cancel" onReset={() => setAddUserModal(false)} />
                        </AddUserForm>
                    </EditModal>
                </>
            )}

            {findUserModal && (
                <>
                    <div className="fixed inset-0 bg-gray-800 opacity-50 z-50"></div>
                    <EditModal onClose={() => setFindUserModal(false)}>
                        <Heading title="Select User" />
                        <FindUser onClose={handleSaveUser} handleAddedUsers={handleAddedUsers} />
                    </EditModal>
                </>
            )}
        </div>
    );
};

export default IssueDevice;
