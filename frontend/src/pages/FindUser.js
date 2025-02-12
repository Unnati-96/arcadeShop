import SubmitButton from "../components/SubmitButton";
import { useEffect, useState } from "react";
import { getUser } from "../services/userService";
import Error from "../components/Error";

const FindUser = ({ onClose, handleAddedUsers, selectdUsers }) => {
    const [users, setUsers] = useState(selectdUsers);
    const [selectedUsers, setSelectedUsers] = useState(selectdUsers);
    const [error, setError] = useState(null);

    const [filterFormData, setFilterFormData] = useState({
        email: "",
        name: "",
        phoneNo: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFilterFormData({ ...filterFormData, [name]: value });
    };

    const handleApplyFilter = async (e) => {
        e.preventDefault();
        // console.log(filterFormData);
        const filterdUserList = await getUser(filterFormData);
        setUsers(filterdUserList);
        // console.log("Filtered user List: ", filterdUserList);
    };

    const handleRowClick = (user) => {
        // console.log(user._id);
        const isSelected = selectedUsers.some(u => u._id === user._id);
        if (isSelected) {
            setSelectedUsers(selectedUsers.filter(u => u._id !== user._id));
        }
        else {
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

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsersList = await getUser();
                setUsers(allUsersList);
            } catch (error) {
                setError(error.message || 'An Unkonwn error occured.');
                // console.error("Error: ", error.message);
            }
        };

        fetchUsers();
        handleAddedUsers(selectedUsers);

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(localStorage.getItem('user')));
        }
        onClose(selectedUsers);
        console.log("Selected user: ", selectedUsers)
    }, [selectedUsers, error]);

    return (
        <div className="flex flex-col">
            {/* Filter */}
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
                            htmlFor="phoneNo"
                            className="block text-sm font-medium text-gray-700 mb-1 text-left">Phone</label>
                        <input
                            type="number"
                            name="phoneNo"
                            id="phoneNo"
                            onChange={handleOnChange}
                            value={filterFormData.phoneNo}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="27568348593"
                        />
                    </div>

                    <div className="mt-5">
                        <SubmitButton text="Apply" />
                    </div>
                </form>
            </div>

            {error && <Error error={error} />}

            {/* User list Table as per filter */}
            <div className="max-h-[65vh] overflow-y-scroll">
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
                            const isSelected = selectedUsers.some(u => u._id === user._id);
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
                                    <td className="px-8 py-3 w-fit">{user.phoneNo}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FindUser;
