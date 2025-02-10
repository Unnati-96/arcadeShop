import Heading from "../components/Heading";
import DeviceForm from "../components/DeviceForm";
import EditModal from "../components/EditModal";
import ResetButton from "../components/ResetButton";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {updateDevice} from "../services/deviceService";

const EditDevice = ({ data, onClose }) => {
    const navigate = useNavigate();

    const handleEditDevice = async (updatedData) => {
        try{
            const editDevice = await updateDevice(updatedData);
            if(editDevice){
                console.log("Edited Device: ", editDevice);
                navigate('/device/view');
            }
        }
        catch(error){
            console.error("Error: ", error.message);
        }
    };

    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    return (
        <EditModal onClose={onClose}>
            <Heading title="Edit Device Details" />
            <p>Current user testing: {loggedInUser}</p>
            <DeviceForm initialData={data} onSubmit={handleEditDevice} onReset={false} >
                <ResetButton text="Cancel" onReset={onClose} />
            </DeviceForm>
        </EditModal>
    );
};

export default EditDevice;
