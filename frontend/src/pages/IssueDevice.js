import React, {useEffect, useState} from "react";
import ResetButton from "../components/ResetButton";
import SubmitButton from "../components/SubmitButton";
import Heading from "../components/Heading";
import {AiFillDelete} from "react-icons/ai";
import AddUserForm from "../components/AddUserForm";
import EditModal from "../components/EditModal";
import FindUser from "./FindUser";

const IssueDevice = () => {
    const [addUserModal, setAddUserModal] = useState(false);
    const [findUserModal, setFindUserModal] = useState(false);

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
        users: [...user],
        entryTime: "",
        exitTime: "",
        duration: "",
    });

    const handleUserDataSubmit = (submittedData) => {
        // handle add new user
        let updateUser = [...user];
        updateUser.push(submittedData);
        setUser(updateUser);
        console.log("User data after adding user: ", user);
        console.log("New Use Added data: ", submittedData);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log("Form submitted with data:", formData);
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
    // ===============================================================================================
    const handelDeleteUser = (duser) => {
        let updatedUsers = user;
        updatedUsers.filter( (u) => u === duser);
        // setFormData(prevFormData => ({
        //     ...prevFormData,
        //     users: updatedUsers
        // }));
        setUser(updatedUsers);
        console.log(user);
    };

    useEffect(() => {},[formData.users])
    return (
        <div className="w-[60vw] p-6 ">
            <Heading title="Issue Device" />
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
                        >
                            <option value="" disabled>Select</option>
                            <option value="S12-PS5">S12-PS5</option>
                            <option value="S11-VR-3">S11-VR</option>
                            <option value="S05-VR">S05-VR</option>
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
                            { user.map((usr, index) => (
                                <tr className="border-b flex items-center w-full" key={index}>
                                    <td className="px-8 py-3">{index+1} </td>
                                    <td className="px-8 py-3 w-1/4">{usr.name}</td>
                                    <td className="px-10 py-3 w-2/4">{usr.email}</td>
                                    {/* delete button not working =========================*/}
                                    <td className="px-8 py-3 hover:cursor-pointer hover:text-red-500"><AiFillDelete onClick={() => handelDeleteUser(usr)}/></td>
                                </tr>
                            )) }
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

                {/* OR Section */}
                <div className=" text-center">OR</div>

                {/* Duration */}
                <div className="mb-6 flex items-center justify-center">
                    <div className="w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            Duration
                        </label>
                        <input
                            type="time"
                            name="duration"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            onChange={handleChange}
                            value={formData.duration}
                        />
                    </div>
                </div>

                {/*Buttons*/}
                <div className="mt-10 flex items-center justify-center space-x-10">
                    <ResetButton onReset={handleReset} />
                    <SubmitButton text="Proceed"/>
                </div>
            </form>

            {/* Modal */}
            {addUserModal && (
                <>
                    {/* Overlay background to disable background interaction */}
                    <div className="fixed inset-0 bg-gray-800 opacity-50 z-50"></div>

                    <EditModal onClose={() => setAddUserModal(false)} >
                        <Heading title="Add User Details" />
                        <AddUserForm initialData={userFormData} onSubmit={handleUserDataSubmit} disabledInput={["role"]}>
                            <ResetButton text="Cancel" onReset={() => setAddUserModal(false)} />
                        </AddUserForm>
                    </EditModal>
                </>
            )}

            {findUserModal && (
                <>
                    {/* Overlay background to disable background interaction */}
                    <div className="fixed inset-0 bg-gray-800 opacity-50 z-50"></div>
                    <EditModal onClose={() => setFindUserModal(false)} >
                        <Heading title="Select User" />
                        {/* code for select user modal content */}
                        <FindUser onClose={handleSaveUser} />
                    </EditModal>
                </>
            )}
        </div>
    );
};

export default IssueDevice;
