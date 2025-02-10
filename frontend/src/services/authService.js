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
        });

        if(!response.ok){
            throw new Error("Loggin Failed");
        }

        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        return data;
    }
    catch(error){
        console.error(error.message);
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
            throw new Error("Signup Failed");
        }

        const data = await response.json();
        return data;
    }catch(error){
        console.error(error.message);
    }
}