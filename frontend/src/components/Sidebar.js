import { FaPlus, FaEye, FaHistory, FaUserPlus, FaUsers, FaTools } from 'react-icons/fa';
import {useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ArcadeContext} from '../context/ArcadeContext';

const Sidebar = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) );
    const location = useLocation();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, []);

    return (
            <div className="min-h-screen  flex flex-col bg-gray-800 text-white p-4 w-64">
                <div className="flex items-center mb-6">
                    <span className="text-2xl font-bold">Menu</span>
                </div>
                <hr className="border-gray-600 mb-4" />
                <ul className="space-y-4">
                    {currentUser && (currentUser['role'] === 'Admin' || currentUser['role'] === 'GuestAdmin') &&
                        <li>
                            <a href="/device/view" className={`flex items-center space-x-2 text-sm hover:bg-teal-500 py-2 px-4 rounded-md
                                ${location.pathname === '/device/view' && "bg-teal-500"}`}>
                                <FaEye className="w-5 h-5" />
                                <span>View Devices</span>
                            </a>
                        </li>
                    }

                    {currentUser && currentUser['role'] === 'Admin' &&
                        <li>
                            <a href="/device/add" className={`flex items-center space-x-2 text-sm hover:bg-teal-500 py-2 px-4 rounded-md
                                ${location.pathname === '/device/add' && "bg-teal-500"}`}>
                                <FaPlus className="w-5 h-5" />
                                <span>Add Device</span>
                            </a>
                        </li>
                    }

                    {currentUser &&  (currentUser['role'] === 'Admin') &&
                        <li>
                            <a href="/user/add" className={`flex items-center space-x-2 text-sm hover:bg-teal-500 py-2 px-4 rounded-md
                                ${location.pathname === '/user/add' && "bg-teal-500"}`}>
                                <FaUserPlus className="w-5 h-5" />
                                <span>Add Users</span>
                            </a>
                        </li>
                    }

                    {currentUser &&  (currentUser['role'] === 'Admin') &&
                        <li>
                            <a href="/user/view" className={`flex items-center space-x-2 text-sm hover:bg-teal-500 py-2 px-4 rounded-md
                                ${location.pathname === '/user/view' && "bg-teal-500"}`}>
                                <FaUsers className="w-5 h-5" />
                                <span>View Users</span>
                            </a>
                        </li>
                    }

                    {currentUser && (currentUser['role'] === 'Admin' || currentUser['role'] === 'GuestAdmin') &&
                        <li>
                            <a href="/inventory/issue-device" className={`flex items-center space-x-2 text-sm hover:bg-teal-500 py-2 px-4 rounded-md
                                ${(location.pathname === '/inventory/issue-device' || location.pathname === '/inventory/billing') && "bg-teal-500"}`}>
                                <FaTools className="w-5 h-5" />
                                <span>Issue Device</span>
                            </a>
                        </li>
                    }

                     {currentUser && (currentUser['role'] === 'Admin') &&
                        <li>
                            <a href="/inventory/history" className={`flex items-center space-x-2 text-sm hover:bg-teal-500 py-2 px-4 rounded-md
                                ${location.pathname === '/inventory/history' && "bg-teal-500"}`}>
                                <FaHistory className="w-5 h-5" />
                                <span>History</span>
                            </a>
                        </li>
                    }
                </ul>
            </div>
    );
};

export default Sidebar;
