import Heading from "../components/Heading";
import DeviceForm from "../components/DeviceForm";
import EditModal from "../components/EditModal";
import ResetButton from "../components/ResetButton";
import React from "react";

const EditDevice = ({ data, onClose }) => {

    const handleEditDevice = () => {
        console.log("Code to edit device with data: ", data);
    };

    return (
        <EditModal onClose={onClose}>
                <Heading title="Edit Device Details" />
            <DeviceForm initialData={data} onSubmit={handleEditDevice} onReset={false} >
                <ResetButton text="Cancel" onReset={onClose} />
            </DeviceForm>
        </EditModal>
    );
};

export default EditDevice;
