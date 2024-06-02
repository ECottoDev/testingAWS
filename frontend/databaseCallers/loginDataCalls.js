const port = 5506;
const host = '44.193.226.223'
export async function getUsers() {
    try {
        const response = await fetch(`http://${host}:${port}/login/users`);
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