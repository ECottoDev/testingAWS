// frontend.js
const port = 5500;

export async function getBudgetData() {
    try {
        const response = await fetch(`http://localhost:${port}/budget/getAllCardData`);
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

// Define other frontend functions...

