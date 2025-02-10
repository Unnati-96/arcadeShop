const base_url = 'http://localhost:4000/arcade/billing';

//generate Bill
export const generateBill = async (billInfo) => {
    try {
        const response = await fetch(`${base_url}/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(billInfo),
        });

        if (!response.ok) throw new Error("Billing Failed, Status:", response.status);

        const data = response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error.message);
    }
}