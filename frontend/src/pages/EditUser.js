import Heading from "../components/Heading";
import EditModal from "../components/EditModal";
import ResetButton from "../components/ResetButton";
import React, {useEffect, useState} from "react";
import AddUserForm from "../components/AddUserForm";
import {useNavigate} from "react-router-dom";
import {editUser} from "../services/userService";

const EditUser = ({ data, onClose }) => {
    const navigate = useNavigate();

    const handleEditUser = async () => {
        try{
            const editedUser = await editUser(data);
            if (editedUser) {
                console.log("User Edited: ", await editedUser);
                navigate("/user/view");
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
            <Heading title="Update User Details" />
            <p>Current user Testing: {loggedInUser}</p>
            <AddUserForm initialData={data} onSubmit={handleEditUser} onReset={false} disabledInput={["role"]} >
                <ResetButton text="Cancel" onReset={onClose} />
            </AddUserForm>
        </EditModal>
    );
};

export default EditUser;
