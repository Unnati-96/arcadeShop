const base_url = 'http://localhost:4000/arcade/billing';

// book a device
export const bookDevice = async (bookingData) => {
    try{
        const response = await fetch(`${base_url}/create`, {
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        if(!response.ok)    throw new Error("Booking Failed, Status:", response.status);

        const data = response.json();
        return data;
    }
    catch(error){
        console.error("Error: ", error.message);
    }
}