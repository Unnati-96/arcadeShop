import Heading from "../components/Heading";
import DeviceForm from "../components/DeviceForm";
import EditModal from "../components/EditModal";
import ResetButton from "../components/ResetButton";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {updateDevice} from "../services/deviceService";
import Error from "../components/Error";

const EditDevice = ({ data, onClose, toast }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleEditDevice = async (updatedData) => {
        try{
            setError(null);
            const editDevice = await updateDevice(updatedData);
            // console.log(updatedData)
            if(editDevice){
                onClose();
                // console.log("Edited Device: ", editDevice);
                // navigate('/device/view');
                toast("Device Edited Successfully!")
            }
        }
        catch(error){
            // console.error("Error: ", error.message);
            toast("Failed to edit device");
            setError(error.message || "An unknown error occurred");
        }
    };

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(localStorage.getItem('user')));
        }
    }, [error, toast]);

    return (
        <EditModal onClose={onClose}>
            <Heading title="Edit Device Details" />
            {/*<p>Current user testing: {currentUser}</p>*/}
            <DeviceForm initialData={data} onSubmit={handleEditDevice} onReset={false} disabledInput={["systemId"]}>
                <ResetButton text="Cancel" onReset={onClose} />
                {error && <Error error={error} />}
            </DeviceForm>
        </EditModal>
    );
};

export default EditDevice;
