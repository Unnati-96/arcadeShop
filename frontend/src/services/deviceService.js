const base_url = "http://localhost:4000/arcade/device";

// add new device
export const addDevice = async (deviceData) => {
    try{
        const response = await fetch(`${base_url}/add`, {
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(deviceData),
        });

        if(!response.ok)    throw new Error("Device adding failed: Status: ", await response.status);
        return await response.json();
    }
    catch(error){
        console.error("Error: ", error.message);
    }
}

//edit existing device
export const updateDevice = async (deviceData) => {
    try{
        // console.log(deviceData._id)
        const response = await fetch(`${base_url}/update/${deviceData._id}`, {
            method: 'PUT',
            credentials: 'include',
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(deviceData),
        });

        if(!response.ok)    throw new Error("Update Device failed: Status: ", response.status);
        return await response.json();
    }
    catch(error){
        console.error("Error: ", error.message);
    }
}

//delete existing device
export const deleteDevice = async (deviceData) => {
    try{
        const response = await fetch(`${base_url}/delete/${deviceData._id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers:{
                'Content-type': 'application/json',
            },
        });

        if(!response.ok)    throw new Error("Failed to Delete Device: Status: ", response.status);
        return await response.json();
    }
    catch(error){
        console.error("Error: ", error.message);
    }
}


// get all devices
export const getDevice = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const url = queryParams ? `${base_url}/get?${queryParams}` : `${base_url}/get`;

        const response = await fetch(`${url}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            }
        });

        if(!response.ok)    throw new Error("Error Fetching Devices. Status: ", response.status);

        return await response.json();
    }
    catch(error){
        console.error("Error: ", error.message);
    }
}