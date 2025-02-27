import SubmitButton from "./SubmitButton";
import React, {useEffect, useState} from "react";
import {getDevice} from "../services/deviceService";
import Error from "./Error";

const HistoryFilters = ({onFilteredHistory}) => {
    const [device, setDevice] = useState([]);
    const [error, setError] = useState(null);

    const [filterFormData, setFilterFormData] = useState({
        groupName: "",
        date: "",
        systemId:""
    });

    const getDeviceList = async () => {
        try {
            const deviceList = await getDevice({});
            setDevice(deviceList);
        } catch (error) {
            setError(error.message);
        }

    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFilterFormData({ ...filterFormData, [name]: value });
    };

    const handleApplyFilter = async (e) => {
        e.preventDefault();
        try{
            setError(null);
            await onFilteredHistory(filterFormData);
        }
        catch(error){
            // console.log("Error : ", error)
            setError(error.message);
        }
    };

    useEffect(() => {
        getDeviceList();
    }, [ error]);

    return (
        <>
        <div className="flex w-full justify-around border px-5 py-4 mb-4">
            <form
                onSubmit={handleApplyFilter}
                className="space-x-4 flex justify-evenly items-center w-full">
                <div>
                    <label
                        htmlFor="groupName"
                        className="block text-sm font-medium text-gray-700 mb-1 text-left">Group Name</label>
                    <input
                        type="text"
                        name="groupName"
                        id="groupName"
                        onChange={handleOnChange}
                        value={filterFormData.groupName}
                        className="w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Eg.Rangers"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                        System Id
                    </label>
                    <select
                        name="systemId"
                        className="w-[200px] px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        onChange={handleOnChange} // Handle the device selection change
                        value={filterFormData.systemId}
                    >
                        <option value="">Select</option>
                        {device.map((d) => (
                            <option key={d._id} value={d.systemId}>{d.systemId}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 mb-1 text-left">Date</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        onChange={handleOnChange}
                        value={filterFormData.date}
                        className="w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="dd/mm/yyyy"
                    />
                </div>

                <div className="mt-5">
                    <SubmitButton text="Apply" />
                </div>
            </form>
        </div>
        
            {/*    Error*/}
            {error && <div  ><span className='font-bold'>Messsage: </span>{error}</div>}
    </>
    )
}

export default HistoryFilters;