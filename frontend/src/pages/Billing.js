import { useLocation, useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import React, {useState} from "react";
import Bill from "../components/Bill";
import ResetButton from "../components/ResetButton";
import {bookDevice} from "../services/bookingService";
import {generateBill} from "../services/billingService";

const Billing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [bill, setBill] = useState();
    const formData = location.state?.formData; // Access formData from the location's state

    const handleBack = () => {
        navigate("/inventory/issue-device", { state: { formData } }); // Pass formData when going back
    };

    const handleIssueDevice = async () => {
        try{
            const issue = await bookDevice(formData);
            console.log("Device Issued: ", issue);
            const generateBill = await generateBill(bill);
        }
        catch(error){
            console.error("Error: ", error.message);
        }
    }

    return (
        <div className="w-[60vw] p-6 ">
            {/*heading*/}
            <Heading title="Issue Device" />
            <div className='border p-8 px-0 w-[50vw] max-w-4xl mx-auto flex flex-col justify-start items-center space-y-8'>
                <Bill data={formData}/>
                <div className="w-full flex justify-center space-x-4 mt-8">
                    <ResetButton text="Back" onReset={handleBack} />
                    <button
                        onClick={handleIssueDevice}
                        className={`px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600`}>
                        Issue Device
                    </button>
                </div>
            </div>
            {/*<div>*/}
            {/*    <pre>{JSON.stringify(formData, null, 2)}</pre>*/}
            {/*</div>*/}
            {/*<button onClick={handleBack}>Back</button>*/}
        </div>
    );
};

export default Billing;
