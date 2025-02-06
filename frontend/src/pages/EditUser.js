import Heading from "../components/Heading";
import EditModal from "../components/EditModal";
import ResetButton from "../components/ResetButton";
import React from "react";
import AddUserForm from "../components/AddUserForm";
import {editUser} from "../context/UserContext";
import {useNavigate} from "react-router-dom";

const EditUser = ({ data, onClose }) => {
    const navigate = useNavigate();

    const handleEditUser = async () => {
        console.log("Code to edit device with data: ", data);
        const isFormSubmitted = await editUser(data);
        if (isFormSubmitted) {
            console.log("User Updated successfully");
            navigate("/user/view");
        }else{
            console.error("User Update Failed");
        }
    };

    return (
        <EditModal onClose={onClose}>
            <Heading title="Update User Details" />
            <AddUserForm initialData={data} onSubmit={handleEditUser} onReset={false} disabledInput={["role"]} >
                <ResetButton text="Cancel" onReset={onClose} />
            </AddUserForm>
        </EditModal>
    );
};

export default EditUser;
