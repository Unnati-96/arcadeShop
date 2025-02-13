import {useEffect, useState} from "react";
import {getDevice} from "../services/deviceService";
import {useNavigate} from "react-router-dom";
import Heading from "./Heading";

const NoAccess = () => {
    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    // const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        const fetchDevice = async () => {
            try{
                const data = await getDevice();
                if (data) setDevices(data);
            }
            catch(error) {
                setError(error.message || "An unknown error occurred");
                // console.error("Data Fetching failed");
            }
        }

        // const storedUser = localStorage.getItem('user');
        // if (storedUser) {
        //     setCurrentUser(JSON.parse(localStorage.getItem('user')));
        // }
        fetchDevice();
    }, [error]);

    return(
        <div className='flex flex-col justify-center items-center border h-[80vh] w-full p-50'>
            <h1 className='text-red-500 text-2xl text-center mb-10'>You Have limited Access to this site.</h1>

            <Heading title="Pricing Chart" />
            <div className="flex items-center justify-center mx-auto mt-5">
                <table className="border border-collapse w-full">
                    <thead>
                    <tr className="font-bold text-lg bg-gray-200">
                        <td className="px-5 py-3 w-fit">SystemId</td>
                        <td className="px-8 py-3 w-fit">Device Type</td>
                        <td className="px-5 py-3 w-fit">Price/hour</td>
                        <td className="px-8 py-3 w-fit">Availability</td>
                    </tr>
                    </thead>
                    <tbody>
                    {devices.map((device) => (
                        <tr key={device.systemId} className="border text-center hover:bg-green-100">
                            <td className="px-5 py-3">{device.systemId} </td>
                            <td className="px-8 py-3">{device.deviceType}</td>
                            <td className="px-5 py-3">₹ {device.pricePerHour}</td>
                            <td className="px-8 py-3">{device.isAvailable ? "Available" : "Not Available"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NoAccess;