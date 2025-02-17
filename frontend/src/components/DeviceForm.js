import React, {useState} from "react";
import ResetButton from "./ResetButton";
import SubmitButton from "./SubmitButton";

const DeviceForm = ({initialData, onSubmit, onReset, children, disabledInput}) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const {value, name} = e.target;
        if (!disabledInput.includes(name)) {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        handleReset();
    };

    return (
        <form
            className="my-10 ml-40"
            onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center">
                <label
                    htmlFor="systemId"
                    className="block text-gray-700 font-medium mr-4 w-1/3"
                >
                    System Id:
                </label>
                <input
                    type="text"
                    id="systemId"
                    name="systemId"
                    value={formData.systemId}
                    onChange={handleChange}
                    className={`w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        disabledInput.includes("systemId") ? "bg-gray-200" : ""
                    }`}
                    required
                    placeholder="S12-PS5"
                />
            </div>

            <div className="mb-4 flex items-center">
                <label
                    htmlFor="pricingPerHour"
                    className="block text-gray-700 font-medium mr-4 w-1/3"
                >
                    Pricing/hour:
                </label>
                <input
                    type="number"
                    id="pricePerHour"
                    name="pricePerHour"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="30.0"
                />
            </div>

            <div className="mb-4 flex items-center">
                <label
                    htmlFor="deviceType"
                    className="block text-gray-700 font-medium mr-4 w-1/3"
                >
                    Device Type:
                </label>
                <input
                    type="text"
                    id="deviceType"
                    name="deviceType"
                    value={formData.deviceType}
                    onChange={handleChange}
                    className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="PS-5"
                />
            </div>

            <div className="mb-4 flex items-start">
                <label
                    htmlFor="description"
                    className="block text-gray-700 font-medium mr-4 w-1/3"
                >
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                    placeholder="Additional Details like date of purchase."
                ></textarea>
            </div>
            {/* Buttons */}
            <div className="mt-10 flex items-center justify-center space-x-10">
                {onReset && <ResetButton text="Reset" onReset={handleReset} />}
                {children}
                {onSubmit && <SubmitButton text="Submit" onSubmit={handleSubmit} />}
            </div>
        </form>
    )
}
export default DeviceForm