const base_url = "http://localhost:4000/arcade/auth"


// login service
export const loginUser = async (userData) => {
    try{
        const response = await fetch(`${base_url}/signin`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: 'include',
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred during login.");
        }

        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        console.log(data)
        return data;
    }
    catch(error){
        throw new Error(error.message);
    }
}


// Signup service
export const signupUser = async (userData) => {
    try{
        const response = await fetch(`${base_url}/signup`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred during Signup.");
        }

        const data = await response.json();
        return data;
    }catch(error){
        throw new Error(error.message);
    }
}

// Logout service
export const logout = async () => {
    try{
        const response = await fetch(`${base_url}/signout`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "Sigout Failed");
        }

        const data = await response.json();
        return data;
    }catch(error){
        throw new Error(error.message);
    }
}