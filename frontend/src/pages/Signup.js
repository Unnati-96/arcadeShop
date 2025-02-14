import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {signupUser} from "../services/authService";
import Error from "../components/Error";

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        phoneNo: ""
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try{
            setError(null);
            const isFormSubmitted = await signupUser(formData);
            // console.log("Form Submitted")
            navigate("/login");
        }catch(error){
            setError(error.message || "An unknown error occurred");
            // console.error("Error creating user: ", error.message);
        }
    };

    useEffect(() => {

    }, [error]);

    return (
        <div className="py-10 bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">SignUp</h2>

                <form
                    className="mt-8"
                    onSubmit={handleOnSubmit}>
                    {/*Full Name*/}
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1 text-left">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="John Deo"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1 text-left">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="john@email.com"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-5">
                        <label
                            htmlFor="phoneNo"
                            className="block text-sm font-medium text-gray-700 mb-1 text-left">Phone</label>
                        <input
                            type="number"
                            id="phoneNo"
                            name="phoneNo"
                            value={formData.phoneNo}
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="9876543210"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-5 flex items-center border border-gray-300 rounded-lg ">
                        <label
                            htmlFor="role"
                            className="text-sm font-medium text-gray-700 w-1/3 px-4 py-2 border-r-2 border-gray-300 ">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleOnChange}
                            required
                            className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all">
                            <option value="" disabled selected>Select</option>
                            <option value="Admin">Admin</option>
                            <option value="GuestAdmin">Guest Admin</option>
                            <option value="Guest">Guest</option>
                        </select>
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1 text-left">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {/*Error Display*/}
                    {error && <Error error={error} />}

                    <button
                        type="submit"
                        className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Log In</Link>
                </div>
            </div>
        </div>
    );
}
export default Signup;
