import Heading from "../components/Heading";
import EditModal from "../components/EditModal";
import ResetButton from "../components/ResetButton";
import React, {useEffect, useState} from "react";
import AddUserForm from "../components/AddUserForm";
import {useNavigate} from "react-router-dom";
import {editUser} from "../services/userService";
import Error from "../components/Error";

const EditUser = ({ data, onClose, toast }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const handleEditUser = async (updatedData) => {
        try{
            setError(null);
            const editedUser = await editUser(updatedData);
            if (editedUser) {
                onClose();
                // console.log("User Edited: ", await editedUser);
                // navigate("/user/view");
                toast("User Edited Successfully!")
            }
        }
        catch(error){
            // console.error("Error: ", error.message);
            setError(error.message || "An unknown error occurred");
            toast("Failed to edit user");
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
            <Heading title="Update User Details" />
            {/*<p>Current user Testing: {currentUser}</p>*/}
            <AddUserForm initialData={data} onSubmit={handleEditUser} onReset={false} disabledInput={["role"]} >
                <ResetButton text="Cancel" onReset={onClose} />
            </AddUserForm>
            {error && <Error error={error}/>}
        </EditModal>
    );
};

export default EditUser;
