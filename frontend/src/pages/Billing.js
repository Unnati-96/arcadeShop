import { useLocation, useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import React, { useEffect, useState, useMemo } from "react";
import Bill from "../components/Bill";
import ResetButton from "../components/ResetButton";
import { bookDevice } from "../services/bookingService";
import {generateBill} from "../services/billingService";
import Error from "../components/Error";
import Toast from "../components/Toast";

const Billing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isBilled, setIsBilled] = useState(false);

    const formData = location.state?.updatedFormData;
    const billData = location.state?.getBillData;
    const [bill, setBill] = useState(billData);
    const [toast, setToast] = useState(null);

    const handleBack = () => {
        navigate("/inventory/issue-device", { state: { formData, bill } });
    };


    const handleIssueDevice = async () => {
        try {
            setError(null);
            const issue = await bookDevice(formData);
            // console.log("Device Issued: ", issue);

            const bookingId = issue.BookingId;
            // console.log(" BID: ",bookingId)

            setBill(prevState => ({
                ...prevState,
                bookingId: bookingId,
            }));

            const savedBill = await generateBill({ ...bill, bookingId });
            // console.log("Saved Bill: ", savedBill);
            setToast("Device Issued Successfully.")

            setIsBilled(true);
        } catch (error) {
            // console.error("Error: ", error.message);
            setToast("Failed to Issue Device.")
            setError(error.message || "An unknown error occurred");
        }
    };


    const handleCanclePrint = () => {
        setIsBilled(false);
        navigate('/inventory/issue-device');
    };

    const handlePrint = () => {
        const content = document.querySelector('.print');
        const printWindow = window.open('', '', 'width=800,height=600');

        printWindow.document.write(`${content.innerHTML}`);

        printWindow.document.close();
        printWindow.print();
    };

    useEffect(() => {
        // console.log(bill);
    }, [bill, error, toast]);

    return (
        <div className="w-[60vw] p-6 print">
            {/*heading*/}
            <Heading title="Issue Device" />
            <div className='border p-8 px-0 w-[50vw] max-w-4xl mx-auto flex flex-col justify-start items-center space-y-8'>
                <Bill data={bill} />
                { !isBilled &&
                    (<div className="w-full flex justify-center space-x-4 mt-8">
                            <ResetButton text="Back" onReset={handleBack} />
                            <button
                                onClick={handleIssueDevice}
                                className={`px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600`}>
                                Issue Device
                            </button>
                        </div>
                    )}
                { isBilled &&
                    (<div className="w-full flex justify-center space-x-4 mt-8">
                            <ResetButton text="Close" onReset={handleCanclePrint} />
                            <button
                                onClick={handlePrint}
                                className={`px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600`}>
                                Print
                            </button>
                        </div>
                    )}
                {error && <Error error={error} />}
                {toast && <Toast message={toast} />}
            </div>
        </div>
    );
};

export default Billing;
