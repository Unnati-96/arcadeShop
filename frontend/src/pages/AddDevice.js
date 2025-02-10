import React, {useEffect, useState} from "react";
import Heading from "../components/Heading";
import DeviceForm from "../components/DeviceForm";
import {addDevice} from "../services/deviceService";
import {useNavigate} from "react-router-dom";

const AddDevice = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        systemId: "",
        pricePerHour: "",
        deviceType: "",
        isAvailable: "true",
        description: "",
    });

    const handleSubmit = async (submittedData) => {
        try{
            const addedDevice = await addDevice(submittedData);
            if(addedDevice){
                console.log("Device Added: ", addedDevice);
                navigate('/device/view')
            }
        }
        catch(error){
            console.log("Error: ", error.message);
        }
        console.log("Form submitted with data:", submittedData);
    };

    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    return (
        <div className="w-[80vw] p-6 bg-white rounded-lg flex flex-col">
            <Heading title="Add New Device" />
            <p>Current User testing: {loggedInUser}</p>
            <DeviceForm initialData={formData} onSubmit={handleSubmit} onReset={true}  />
        </div>
    );
};

export default AddDevice;
