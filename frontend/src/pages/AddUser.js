import {useEffect, useState} from "react";
import Heading from "../components/Heading";
import AddUserForm from "../components/AddUserForm";
import {addUser} from "../services/userService";
import {useNavigate} from "react-router-dom";
import Error from "../components/Error";
import Toast from "../components/Toast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [toast, setToast]= useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNo: "",
        role: "",
        password: "",
    });

    const handleSubmit = async (submittedData) => {
        try{
            setError(null);
            const addedUser = await addUser(submittedData);
            if(addedUser){
                // navigate('/user/view');
                setToast("User Added Successfully.");
                // toast.success('Device added successfully!');
            }
        }catch(error){
            // console.error("Form Submission Failed");
            setError(error.message || "An Unknown error occured.")            
            // toast.error('Failed to add device!');
            setToast("Failed to add user.");
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
            
            {toast && <Toast message={toast} />}
        </div>
    );
};

export default AddUser;
