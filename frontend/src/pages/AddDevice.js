import React, {useEffect, useState} from "react";
import Heading from "../components/Heading";
import DeviceForm from "../components/DeviceForm";
import {addDevice} from "../services/deviceService";
import {useNavigate} from "react-router-dom";
import Error from "../components/Error";
import Toast from "../components/Toast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDevice = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [toast, setToast]= useState(null);
    const [formData, setFormData] = useState({
        systemId: "",
        pricePerHour: "",
        deviceType: "",
        isAvailable: true,
        description: "",
    });

    const handleSubmit = async (submittedData) => {
        try{
            setError(null);
            const addedDevice = await addDevice(submittedData);
            if(addedDevice){
                setToast("Device Added Successfully.");
                // toast.success('Device added successfully!');
            }
        }
        catch(error){
            setError(error.message || "An unknown error occurred");
            // toast.error('Failed to add device!');
            setToast("Failed to add device.");
        }
    };

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(localStorage.getItem('user')));
        }
    }, [error]);

    return (
        <div className="w-[80vw] p-6 bg-white rounded-lg flex flex-col">
            <Heading title="Add New Device" />
            <DeviceForm initialData={formData} onSubmit={handleSubmit} onReset={true} disabledInput={[]} />
            {error && <Error error={error} />}
            {toast && <Toast message={toast} />}
            {/* <ToastContainer /> */}
        </div>
    );
};

export default AddDevice;
