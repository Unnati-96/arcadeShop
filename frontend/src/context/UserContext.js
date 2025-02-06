const base_url = 'http://localhost:8000/arcade';

//     Create a user
export const createUser = async(userData) =>{
    try {
        const response = await fetch(`${base_url}/user/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
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
export const editUser = async(_id, userData) =>{
    try {
        const response = await fetch(`${base_url}/user/update/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(userData),
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
export const getUser = async(...args) =>{ //args[0] = userData, args[1] = query
    try {
        // problem how to use query in this method may have _id, or phone, or name, or email
        const response = await fetch(`${base_url}/user/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to Fetch user');
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
export const deleteUser = async(_id) =>{
    try {
        const response = await fetch(`${base_url}/user/delete/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
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