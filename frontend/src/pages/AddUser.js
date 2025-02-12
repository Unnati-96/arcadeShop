import {useEffect, useState} from "react";
import Heading from "../components/Heading";
import AddUserForm from "../components/AddUserForm";
import {addUser} from "../services/userService";
import {useNavigate} from "react-router-dom";
import Error from "../components/Error";

const AddUser = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
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
            // console.error("Form Submission Failed");
            setError(error.message || "An Unknown error occured.")
        }
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
            <Heading title="Add User"/>
            <AddUserForm initialData={formData} onSubmit={handleSubmit} onReset={true} disabledInput={[]} />
            {error && <Error error={error}/>}
        </div>
    );
};

export default AddUser;
