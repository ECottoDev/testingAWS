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

export async function systemLogin(username, password, success = () => {}, fail = () => {}) {
    try {
        const response = await fetch(`http://${host}:${port}/login/system`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        });
        if (!response.ok) {
            fail();
            throw new Error('Failed to login');
        } else {
        success();
        return response.json();
	}
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}
