const base_url = 'http://localhost:4000/arcade/device';

//     Create a user
export const createDevice = async(deviceData) =>{
    try {
        const response = await fetch(`${base_url}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(deviceData),
        });

        if (!response.ok) {
            throw new Error('Failed to Add Device');
        }

        const data = await response.json();

        if (data.success) {
            return data;
        } else {
            return false
        }
    } catch (error) {
        return false;
    }
}

// update a user
export const editDevice = async(_id, deviceData) =>{
    try {
        const response = await fetch(`${base_url}/update/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(deviceData),
        });

        if (!response.ok) {
            throw new Error('Failed to update');
        }

        const data = await response.json();

        if (data.success) {
            return data;
        } else {
            return false
        }
    } catch (error) {
        return false;
    }
}

// get users
export const getDevice= async(...args) =>{ //args[0] = userData, args[1] = query
    try {
        // problem how to use query in this method may have _id, or phone, or name, or email
        const response = await fetch(`${base_url}/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to Fetch Device');
        }

        const data = await response.json();

        if (data.success) {
            return data;
        } else {
            return false
        }
    } catch (error) {
        return false;
    }
}

// delete user
export const deleteDevice = async(_id) =>{
    try {
        const response = await fetch(`${base_url}/delete/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete device');
        }

        const data = await response.json();

        if (data.success) {
            return data;
        } else {
            return false
        }
    } catch (error) {
        return false;
    }
}