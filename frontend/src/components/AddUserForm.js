import React, { useState } from "react";
import ResetButton from "./ResetButton";
import SubmitButton from "./SubmitButton";

const AddUserForm = ({ initialData, onSubmit, onReset, disabledInput, children }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // If the field is not disabled, update the form data
        if (!disabledInput.includes(name)) {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        handleReset();
    };

    const handleReset = () => {
        const resetData = Object.keys(initialData).reduce((acc, key) => {
            // Check if the field is not in disabledInput
            if (!disabledInput.includes(key)) {
                acc[key] = "";
            } else {
                acc[key] = formData[key];
            }
            return acc;
        }, {});
        setFormData(resetData);
    };

    return (
        <form className="my-10 ml-40" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4 flex items-center">
                <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mr-4 w-1/3"
                >
                    Full Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        disabledInput.includes("name") ? "bg-gray-200" : ""
                    }`}
                    required
                    placeholder="John Deo"
                    disabled={disabledInput.includes("name")}
                />
            </div>

            {/* Email */}
            <div className="mb-4 flex items-center">
                <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mr-4 w-1/3"
                >
                    Email:
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        disabledInput.includes("email") ? "bg-gray-200" : ""
                    }`}
                    required
                    placeholder="john@xyz.com"
                    disabled={disabledInput.includes("email")}
                />
            </div>

            {/* Phone Number */}
            <div className="mb-4 flex items-center">
                <label
                    htmlFor="phoneNo"
                    className="block text-gray-700 font-medium mr-4 w-1/3"
                >
                    Phone Number:
                </label>
                <input
                    type="number"
                    id="phoneNo"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    className={`w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        disabledInput.includes("phone") ? "bg-gray-200" : ""
                    }`}
                    required
                    placeholder="9876543210"
                    disabled={disabledInput.includes("phoneNo")}
                />
            </div>

            {/* Role */}
            <div className="mb-4 flex items-center">
                <label
                    htmlFor="role"
                    className="block text-gray-700 font-medium mr-4 w-1/3"
                >
                    Role:
                </label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        disabledInput.includes("role") ? "bg-gray-200" : ""
                    }`}
                    disabled={disabledInput.includes("role")}
                >
                    <option value="" disabled>
                        Select
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="Guest Admin">Guest Admin</option>
                    <option value="User">User</option>
                </select>
            </div>

            {/* Password */}
            <div className="mb-4 flex items-center">
                <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium mr-4 w-1/3"
                >
                    Password:
                </label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        disabledInput.includes("password") ? "bg-gray-200" : ""
                    }`}
                    required
                    placeholder="@Ahgs764_=d"
                    disabled={disabledInput.includes("password")}
                />
            </div>

            {/* Buttons */}
            <div className="mt-10 flex items-center justify-center space-x-10">
                {onReset && <ResetButton text="Reset" onReset={handleReset} />}
                {children}
                {onSubmit && <SubmitButton text="Submit" onSubmit={handleSubmit} />}
            </div>
        </form>
    );
};

export default AddUserForm;
