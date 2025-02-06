import { useState } from "react";
import Heading from "../components/Heading";
import AddUserForm from "../components/AddUserForm";
import {createUser} from "../context/UserContext";

const AddUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
    });

    const handleSubmit = async (submittedData) => {
        console.log("Form submitted with data:", submittedData);
        const isFormSubmitted = await createUser(submittedData);
        if (isFormSubmitted) {
            console.log("Form Submitted Successfully");
        }else{
            console.error("Form Submission Failed");
        }
    };

    return (
        <div className="w-[80vw] p-6 bg-white rounded-lg flex flex-col">
            <Heading title="Add User"/>
            <AddUserForm initialData={formData} onSubmit={handleSubmit} onReset={true} disabledInput={[]} />
        </div>
    );
};

export default AddUser;
