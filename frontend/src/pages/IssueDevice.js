import React, {useEffect, useMemo, useState} from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import Error from "../components/Error";

const IssueDevice = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [addUserModal, setAddUserModal] = useState(false);
    const [findUserModal, setFindUserModal] = useState(false);
    const [device, setDevice] = useState([]);
    const [user, setUser] = useState([]);
    // const [userId, setUserId] = useState([])
    const [error, setError] = useState(null);

    const [userFormData, setUserFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "Guest",
        password: "Password",
    });

    const [formData, setFormData] = useState({
        groupName: "",
        systemId: "",
        users: [],
        // userData: [],
        entryTime: "",
        exitTime: "",
        rate: "",
    });

    const [addedUsers, setAddeduser] = useState(formData.usersData);

    const handleAddedUsers = (u) => {
        setAddeduser(u);
    };

    const getDeviceList = async () => {
        try {
            const filters = {"isAvailable": true}
            const deviceList = await getDevice(filters);
            setDevice(deviceList);
            setAddUserModal(false);
        } catch (error) {
            console.error("Error: ", error.message);
        }
    };

    const handleUserDataSubmit = async (submittedData) => {
        try {
            const newuser = await addUser(submittedData);
            let updateUser = [...user]
            updateUser.push(submittedData);
            setUser(updateUser);

            // let updatedUserId = [...userId]
            // updatedUserId.push(submittedData._id)
            // setUserId(updatedUserId);
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

    const handleDeviceChange = (e) => {
        const selectedDevice = device.find(d => d.systemId === e.target.value);
        if (selectedDevice) {
            setFormData({
                ...formData,
                systemId: selectedDevice.systemId,
                rate: selectedDevice.pricePerHour,
            });
        }
    };

    const handleSaveUser = (newUser) => {
        const filteredNewUsers = newUser.filter(newU =>
            !user.some(existingUser => existingUser.email === newU.email)
        );
        setUser(prevUserList => [...prevUserList, ...filteredNewUsers]);

        // const newUsersIds = filteredNewUsers.map(newU => newU._id);
        // setUserId(prev => [...prev, ...newUsersIds]);

    };

    const generateBillData = (billData) => {
        const entry = new Date(billData.entryTime);
        const exit = new Date(billData.exitTime);
        const duration = parseFloat(((exit - entry) / (1000 * 60 * 60)).toFixed(2)) || 0;
        const total = parseFloat((billData.rate * duration * billData.users.length).toFixed(2)) || 0.00;

        // Create a newBill object
        const newBill = {
            date: new Date().toLocaleDateString(),
            billedBy: JSON.parse(localStorage.getItem('user')).name,
            bookingId: "",
            groupName: billData.groupName,
            systemId: billData.systemId,
            rate: billData.rate,
            users: billData.users,
            duration: duration,
            price: total,
        };
        return newBill;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const updatedFormData = {
                ...formData,
                users: [...user],
                // userData: [...user]
            };

            const getBillData = generateBillData(updatedFormData);

            navigate("/inventory/billing", { state: { updatedFormData, getBillData } });
        } catch (error) {
            // console.error("Error:", error.message);
            setError(error.message || "An unknown error occurred");
        }
    };

    const handleReset = () => {
        setFormData({
            groupName: "",
            systemId: "",
            users: [],
            userData: [],
            entryTime: "",
            exitTime: "",
            rate: "",
        });
    };

    const handelRemoveUser = (duser) => {
        let updatedUsers = user;
        updatedUsers = updatedUsers.filter((u) => u !== duser);
        setUser(updatedUsers);

        // let updatedIds = updatedUsers.map(u => u._id);
        // setUserId(updatedIds);
        // console.log(user);
    };

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(localStorage.getItem('user')));
        }
        getDeviceList();

        const storedData = location.state?.formData;
        if (storedData) {
            setFormData(storedData);
        }
    }, [formData.users, user,  location.state, formData, error]);

    return (
        <div className="w-[60vw] p-6 ">
            <Heading title="Issue Device" />
            {/*<p>Current user testing: {currentUser}</p>*/}
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
                            onChange={handleDeviceChange} // Handle the device selection change
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

                {/* Rate Input (based on selected device) */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                        Rate (Per Hour)
                    </label>
                    <input
                        type="text"
                        name="rate"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        value={formData.rate}
                        readOnly // Make the rate field read-only since it's populated from the device
                    />
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

                {error && <Error error={error} />}

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
                            {error && <Error error={error} />}
                        </AddUserForm>
                    </EditModal>
                </>
            )}

            {findUserModal && (
                <>
                    <div className="fixed inset-0 bg-gray-800 opacity-50 z-50"></div>
                    <EditModal onClose={() => setFindUserModal(false)} >
                        <Heading title="Select User" />
                        {error && <Error error={error} />}
                        <FindUser onClose={handleSaveUser} handleAddedUsers={handleAddedUsers} selectdUsers={user}/>
                    </EditModal>
                </>
            )}
        </div>
    );
};

export default IssueDevice;
