const base_url = "http://localhost:4000/arcade/user"

// add new user
export const addUser = async (userData) => {
    try{
        const response = await fetch(`${base_url}/add`, {
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred while adding user.");
        }

        const data = await response.json();
        return data;
    }
    catch(error){
        // console.error("Error: ", error.message);
        throw new Error(error.message);
    }
}


// update existing user
export const editUser = async (userData) => {
    try{
        const response = await fetch(`${base_url}/update/${userData._id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData),
        });

        if(!response.ok)    {
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred updating user");
        }

        const data = await response.json();
        console.log("response", await response)
        return data;

    }catch(error){
        // console.error("Error: ", error.message);
        throw new Error(error.message);
    }

}

//delete existing user
export const deleteUser = async (userData) => {
    try{
        const response = await fetch(`${base_url}/delete/${userData._id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers:{
                'Content-type': 'application/json',
            },
        });

        if(!response.ok)    {
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred while deleting user.");
        }

        const data = await response.json();
        return data;
    }catch(error){
        // console.error("Error: ", error.message);
        throw new Error(error.message);
    }
}


// fetch existing user
export const getUser = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const url = queryParams ? `${base_url}/search?${queryParams}` : `${base_url}/search`;
        // console.log(url);
        const response = await fetch(`${url}`, {
           method: 'GET',
            credentials: 'include',
           headers: {
               'Content-type': 'application/json'
           }
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred while getting users.");
        }

        return await response.json();
    }
    catch(error){
        // console.error("Error: ", error.message);
        throw new Error(error.message);
    }
}