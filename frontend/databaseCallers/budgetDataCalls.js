// frontend.js
const port = 5506;
const host = '44.193.226.223'
export async function getBudgetData() {
    try {
        const response = await fetch(`http://${host}:${port}/budget/getAllCardData`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
export async function updateCard(cardID, newAmount) {
    try {
        const response = await fetch(`http://${host}:${port}/budget/updateCard`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
		body: JSON.stringify({CardID: cardID, amountDue: newAmount})
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
