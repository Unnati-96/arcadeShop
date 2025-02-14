import React, {useEffect, useState} from "react";
import HistoryFilter from "../components/HistoryFilter";
import Heading from "../components/Heading";
import { FaEye } from "react-icons/fa";
import EditModal from "../components/EditModal";
import AddUserForm from "../components/AddUserForm";
import ResetButton from "../components/ResetButton";
import Billing from "./Billing";
import Bill from "../components/Bill";
import {useNavigate} from "react-router-dom";
import {getBookingHistory} from "../services/bookingService";
import Error from "../components/Error";
import {getBills} from "../services/billingService";

const History = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [bill, setBill] = useState([]);

    const [billModal, setBillModal] = useState(false);
    const [previewBill, setPreviewBill] = useState([]);

    const handleViewBill = async(billData) => {
        try{
            setBillModal(true);
            const billDetails = await getBills({bookingId: billData})
            setPreviewBill(billDetails[0]);
            // console.log("Bill details: ",billDetails)
        }
        catch(error){
            setError(error.message || "Unexpected Error occcured.")
        }
    }

    const handleFilteredHistory = async (filterFormData) => {
        // console.log("filterFormData: ", filterFormData)
        const filteredHistoryData = await getBookingHistory(filterFormData);
        if (filteredHistoryData)
            setBill(filteredHistoryData);
    }

    const handleCanclePrint = () => {
        setBillModal(false);
    }

    const handlePrint = () => {
        const content = document.querySelector('.print');
        const printWindow = window.open('', '', 'width=800,height=600');

        printWindow.document.write(`${content.innerHTML}`);

        printWindow.document.close();
        printWindow.print();
    }

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try{
                const data = await getBookingHistory();
                if (data) setBill(data);
            }
            catch(error){
                console.log("Error: ",error);
                setError(error.message || "An unknown error occurred");
            }
        }
        fetchBookingHistory();
    }, [previewBill, error]);

    return (
        <div className="flex flex-col  items-center w-full p-6">
            {/* Filter and Heading */}
            <HistoryFilter onFilteredHistory={handleFilteredHistory}/>
            <Heading title="History" />

            {error && <Error error={error} />}

            <div className="w-full mt-2 overflow-x-auto">
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <thead>
                    <tr className="bg-gray-100 text-gray-700 text-sm">
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">System Id</th>
                        <th className="px-4 py-2 text-left">Group Name</th>
                        <th className="px-4 py-2 text-left">Full Name</th>
                        <th className="px-4 py-2 text-left">Duration</th>
                        {/*<th className="px-4 py-2 text-left">Amount</th>*/}
                        <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bill.map((b, index) => (
                        b.users.map((user, userIndex) => (
                            <tr key={`${index}-${userIndex}`} className="border-b hover:bg-green-50">
                                <td className="px-4 py-2">{new Date(b.bookingDate).toLocaleDateString('en-GB')}</td>
                                <td className="px-4 py-2">{b.systemId}</td>
                                <td className="px-4 py-2">{b.groupName}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{parseFloat(((new Date(b.exitTime) - new Date(b.entryTime)) / (1000 * 60 * 60)).toFixed(2)) || 0} hrs</td>
                                {/*<td className="px-4 py-2">₹ {b.price}</td>*/}
                                <td
                                    onClick={() => {handleViewBill(b._id)}}
                                    className="px-4 py-2 text-green-500 cursor-pointer">
                                    <FaEye />
                                </td>
                            </tr>
                        ))
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {billModal && (
                <>
                    <div className="fixed inset-0 bg-gray-800 opacity-50 z-50"></div>
                    <div className='print'>
                        <EditModal className='print' onClose={() => setBillModal(false)}>
                            <Bill data={previewBill} />
                            <div className="w-full flex justify-center space-x-4 mt-8">
                                <ResetButton text="Close" onReset={handleCanclePrint} />
                                <button
                                    onClick={handlePrint}
                                    className={`px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600`}>
                                    Print
                                </button>
                            </div>
                            {error && <Error error={error} />}
                        </EditModal>
                    </div>
                </>
            )}
        </div>
    );
};

export default History;
