import {useContext, useEffect, useState} from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Heading from "../components/Heading";
import EditDevice from "./EditDevice";
import {useNavigate} from "react-router-dom";
import {deleteDevice, getDevice} from "../services/deviceService";
import {ArcadeContext} from "../context/ArcadeContext";
import Error from "../components/Error";
import Toast from "../components/Toast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewDevices = () => {
    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();
    const [toast, setToast]= useState(null);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        const fetchDevice = async () => {
            try{
                setError(null);
                const data = await getDevice();
                if (data) setDevices(data);
            }
            catch(error) {
                setError(error.message || "An unknown error occurred");
                // console.error("Data Fetching failed");
            }
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(localStorage.getItem('user')));
        }
        fetchDevice();
    }, [error, toast]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState({});

    const handleDelete = async (deviceData) => {
        try{
            setError(null);
            const deletedDevice = await deleteDevice(deviceData);
            if(deletedDevice){
                // console.log(deletedDevice);
                // navigate('/device/view');
                setToast("Device deleted Successsfully.")
            }
        }
        catch(error){
            // console.error('Error: ', error.message);
            setError(error.message || "An unknown error occurred");
            setToast("Failed to delete Device.")
        }
    };

    const handleEdit = (deviceData) => {
        // open edit device modal
        setSelectedDevice(deviceData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDevice({});
    };
    const handleToast = (msg) => {
        setToast(msg);
    }

    return (
        <div className="w-full p-6 bg-white rounded-lg flex flex-col">
            <Heading title="View Devices" />
            {/*<p>Current use Testing: {currentUser.name}</p>*/}

            {error && <Error error={error} />}
            {toast && <Toast message={toast} />}

            {/* Table */}
            <div className="flex items-center justify-center mx-auto">
                <table className="border border-collapse w-full">
                    <thead>
                    <tr className="font-bold text-lg bg-gray-200">
                        <td className="px-5 py-3 w-fit">SystemId</td>
                        <td className="px-8 py-3 w-fit">Device Type</td>
                        <td className="px-5 py-3 w-fit">Price/hour</td>
                        <td className="px-8 py-3 w-fit">Availability</td>
                        <td className="px-8 py-3">Description</td>
                        {(currentUser.role === 'Admin') &&
                            (<>
                                <td className="px-4 py-3 w-fit">Edit</td>
                                <td className="px-4 py-3 w-fit">Delete</td>
                            </>)
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {devices.map((device) => (
                        <tr key={device.systemId} className="border text-center hover:bg-green-100">
                            <td className="px-5 py-3">{device.systemId} </td>
                            <td className="px-8 py-3">{device.deviceType}</td>
                            <td className="px-5 py-3">₹ {device.pricePerHour}</td>
                            <td className="px-8 py-3">{device.isAvailable ? "Available" : "Not Available"}</td>
                            <td className="px-8 py-3" title={device.description || "No Description"}>
                                {device.description ? (device.description.length > 25 ? device.description.slice(0, 25) + "..." : device.description) : "No Description"}
                            </td>
                            {(currentUser.role === 'Admin') &&
                                (<>
                                    <td className="px-4 py-3">
                                        <button className="text-blue-500 hover:scale-125 text-xl" onClick={() => handleEdit(device)}><FaEdit /></button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button className="text-red-500 hover:scale-125 text-xl" onClick={() => handleDelete(device)}><RiDeleteBin5Fill /></button>
                                    </td>
                                </>)
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Popup */}
            {isModalOpen && selectedDevice && (
                <>
                    {/* Overlay background to disable background interaction */}
                    <div className="fixed inset-0 bg-gray-800 opacity-50 z-50"></div>
                    <EditDevice data={selectedDevice} onClose={handleCloseModal} toast={handleToast} />

                </>
            )}
        </div>
    );
};

export default ViewDevices;
