import React, {useEffect, useState} from "react";
import Heading from "../components/Heading";
import DeviceForm from "../components/DeviceForm";
import {addDevice} from "../services/deviceService";
import {useNavigate} from "react-router-dom";
import Error from "../components/Error";

const AddDevice = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        systemId: "",
        pricePerHour: "",
        deviceType: "",
        isAvailable: true,
        description: "",
    });

    const handleSubmit = async (submittedData) => {
        try{
            const addedDevice = await addDevice(submittedData);
            if(addedDevice){
                // console.log("Device Added: ", addedDevice);
                navigate('/device/view')
            }else{
                console.log(addedDevice);
            }
        }
        catch(error){
            console.log("Error: ", error.message);
            setError(error.message || "An unknown error occurred");
        }

        console.log("Form submitted with data:", submittedData);
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
            {/*<p>Current User testing: {currentUser}</p>*/}
            <DeviceForm initialData={formData} onSubmit={handleSubmit} onReset={true}  />
            {error && <Error error={error} />}
        </div>
    );
};

export default AddDevice;
