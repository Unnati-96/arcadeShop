import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { ArcadeContext } from "../context/ArcadeContext";
import Error from "../components/Error";

const Login = () => {
    const { setIsLoggedIn } = useContext(ArcadeContext);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        email: '',
        role: '',
        password: '',
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(formData);
            if (loginData) {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    setCurrentUser(storedUser);
                }
                setIsLoggedIn(true);
                // if(currentUser['role'] === 'Guest'){
                //     navigate('/no-access');
                // }else {
                    navigate('/device/view');
                // }
            }
        } catch (error) {
            setError(error.message || "An unknown error occurred");
        }
    };

    // You can handle error display here if needed, but useEffect isn't necessary unless you want to trigger something else.
    useEffect(() => {
        if (error) {
            console.log("Error occurred:", error);
        }
    }, [error]);

    return (
        <div className="py-24 bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">LogIn</h2>

                <form className="mt-10" onSubmit={handleLogin}>
                    <div className="mb-6">
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
                            placeholder="your@email.com"
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
                            <option value="" disabled>Select</option>
                            <option value="Admin">Admin</option>
                            <option value="GuestAdmin">Guest Admin</option>
                            <option value="Guest">Guest</option>
                        </select>
                    </div>

                    <div className="mb-6">
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
                            required
                        />
                    </div>

                    {/*Error Display*/}
                    {error && <Error error={error} />}

                    <div className="my-10 flex items-center justify-center">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                            Log In
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?
                    <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
