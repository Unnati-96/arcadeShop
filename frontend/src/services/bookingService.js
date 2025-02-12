const base_url = 'http://localhost:4000/arcade/booking';

// book a device
export const bookDevice = async (bookingData) => {
    // console.log("Booking Device Schema: ", bookingData)
    try{
        const response = await fetch(`${base_url}/create`, {
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to Book Device.");
        }

        const data = response.json();
        return data;
    } catch (error) {
        // console.error("Error: ", error.message);
        throw new Error(error.message);
    }
}


//get booking history
export const getBookingHistory = async (filters = {}) => {
    try{
        const queryParams = new URLSearchParams(filters).toString();
        const url = queryParams ? `${base_url}/history?${queryParams}` : `${base_url}/history`;
        // console.log(url);
        const response = await fetch(`${url}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to Fetch History.");
        }

        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        // console.error("Error: ", error.message);
        throw new Error(error.message);
    }
}