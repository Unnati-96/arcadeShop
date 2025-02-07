import SubmitButton from "../components/SubmitButton";
import {useEffect, useState} from "react";

const FindUser = ({ onClose }) => {
    const [users, setUsers] = useState([
        { name: "Amit Sharma", email: "amit.sharma@gmail.com", phone: "9123456789", password: "Password@2123", role: "Admin" },
        { name: "Ravi Patel", email: "ravi.patel@yahoo.com", phone: "9876123456", password: "Password@2123", role: "Guest Admin" },
        { name: "Priya Yadav", email: "priya.yadav@outlook.com", phone: "9765432111", password: "Password@2123", role: "User" },
        { name: "Rohit Singh", email: "rohit.singh@aol.com", phone: "9345678910", password: "Password@2123", role: "User" },
        { name: "Nisha Gupta", email: "nisha.gupta@gmail.com", phone: "9845123456", password: "Password@2123", role: "Admin" },
        { name: "Vikram Reddy", email: "vikram.reddy@icloud.com", phone: "9356123412", password: "Password@2123", role: "User" },
        { name: "Anjali Mehta", email: "anjali.mehta@live.com", phone: "9098765432", password: "Password@2123", role: "User" },
        { name: "Kunal Verma", email: "kunal.verma@gmail.com", phone: "8765432109", password: "Password@2123", role: "Guest Admin" },
    ]);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const [filterFormData, setFilterFormData] = useState({
        email: "",
        name: "",
        phone: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFilterFormData({ ...filterFormData, [name]: value });
    };

    const handleApplyFilter = (e) => {
        e.preventDefault();
        console.log(filterFormData);
        // handle apply filter logic
    };

    const handleRowClick = (user) => {
        console.log(user)
        const isSelected = selectedUsers.some(u => u.email === user.email);
        if (isSelected) {
            setSelectedUsers(selectedUsers.filter(u => u.email !== user.email));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleCheckboxChange = (e, user) => {
        if (e.target.checked) {
            setSelectedUsers([...selectedUsers, user]);
        } else {
            setSelectedUsers(selectedUsers.filter(u => u.email !== user.email));
        }
    };

    useEffect(() => {
        onClose(selectedUsers);
    }, [selectedUsers]);


    return (
        <div className="flex flex-col">
            {/* filter */}
            <div className="flex border px-5 py-4 mb-4">
                <form
                    onSubmit={handleApplyFilter}
                    className="space-x-4 flex justify-evenly items-center w-full">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1 text-left">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleOnChange}
                            value={filterFormData.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="John Deo"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1 text-left">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleOnChange}
                            value={filterFormData.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="john@gmail.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1 text-left">Phone</label>
                        <input
                            type="number"
                            name="phone"
                            id="phone"
                            onChange={handleOnChange}
                            value={filterFormData.phone}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="27568348593"
                        />
                    </div>

                    <div className="mt-5">
                        <SubmitButton text="Apply" />
                    </div>
                </form>
            </div>

            {/* User list Table as per filter */}
            <div className="max-h-[65vh] overflow-y-scroll">
                {/*<form className="space-x-4 flex justify-evenly items-center w-full">*/}
                    <div className="flex items-center justify-center mx-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="font-bold text-lg border-y-2 text-center">
                                <td className="px-8 py-3 w-fit">Select</td>
                                <td className="px-8 py-3 w-fit">Name</td>
                                <td className="px-8 py-3 w-fit">Email</td>
                                <td className="px-8 py-3 w-fit">Phone</td>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => {
                                const isSelected = selectedUsers.some(u => u.email === user.email);
                                return (
                                    <tr
                                        key={user.email}
                                        className="border-b text-center hover:bg-green-50 hover:cursor-pointer"
                                        onClick={() => handleRowClick(user)}
                                    >
                                        <td className="px-8 py-3 w-fit">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) => handleCheckboxChange(e, user)}
                                            />
                                        </td>
                                        <td className="px-8 py-3 w-fit">{user.name}</td>
                                        <td className="px-8 py-3 w-fit">{user.email}</td>
                                        <td className="px-8 py-3 w-fit">{user.phone}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                {/*</form>*/}
            </div>
        </div>
    );
};

export default FindUser;
