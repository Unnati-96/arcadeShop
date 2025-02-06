import React, { useState } from "react";
import Heading from "../components/Heading";
import DeviceForm from "../components/DeviceForm";

const AddDevice = () => {
    const [formData, setFormData] = useState({
        systemId: "",
        pricePerHour: "",
        deviceType: "",
        isAvailable: false,
        description: "",
    });

    const handleSubmit = (submittedData) => {
        // Handle form submission logic
        console.log("Form submitted with data:", submittedData);
    };



    return (
        <div className="w-[80vw] p-6 bg-white rounded-lg flex flex-col">
            <Heading title="Add New Device" />
            <DeviceForm initialData={formData} onSubmit={handleSubmit} onReset={true}  />
        </div>
    );
};

export default AddDevice;
