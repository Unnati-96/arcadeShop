import {useEffect, useState} from "react";
import Heading from "../components/Heading";
import AddUserForm from "../components/AddUserForm";
import {addUser} from "../services/userService";
import {useNavigate} from "react-router-dom";

const AddUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNo: "",
        role: "",
        password: "",
    });

    const handleSubmit = async (submittedData) => {
        try{
            const addedUser = await addUser(submittedData);
            if(addedUser){
                console.log("Added user: ", addedUser);
                navigate('/user/view');
            }
        }catch(error){
            console.error("Form Submission Failed");
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
        <div className="w-[80vw] p-6 bg-white rounded-lg flex flex-col">
            <Heading title="Add User"/>
            <p>Testing Current user details: {loggedInUser}</p>
            <AddUserForm initialData={formData} onSubmit={handleSubmit} onReset={true} disabledInput={[]} />
        </div>
    );
};

export default AddUser;
