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

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "Device adding failed.");
        }
        return await response.json();
    }
    catch(error){
        throw new Error(error.message);
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

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "Update Device failed: Status: ");
        }
        return await response.json();
    }
    catch(error){
        throw new Error(error.message);
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

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete device");
        }
        return await response.json();
    }
    catch(error){
        throw new Error(error.message);
    }
}


// get all devices
export const getDevice = async (filters = {}) => {
    try {
        // console.log(filters)
        const queryParams = new URLSearchParams(filters).toString();
        const url = queryParams ? `${base_url}/search?${queryParams}` : `${base_url}/search`;

        const response = await fetch(`${url}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            }
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "Error Fetching Devices. Status: ");
        }

        return await response.json();
    }
    catch(error){
        throw new Error("Error: ", error.message);
    }
}