const base_url = 'http://localhost:4000/arcade/billing';

//generate Bill
export const generateBill = async (billInfo) => {
    try {
        console.log("Biilling Schema: ", billInfo);
        const response = await fetch(`${base_url}/generatebill`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(billInfo),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to generate Bill.");
        }

        const data = response.json();
        return data;
    } catch (error) {
        // console.error("Error: ", error.message);
        throw new Error(error.message);
    }
}


//get bills
export const getBills = async (filters = {}) => {
    try{
        // console.log("Filter Bill: ", filters);
        const queryParams = new URLSearchParams(filters).toString();
        const url = queryParams ? `${base_url}/getbill?${queryParams}` : `${base_url}/getbill`;
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
            throw new Error(errorData.message || "Failed to Fetch Bill.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // console.error("Error: ", error.message);
        throw new Error(error.message);
    }
}