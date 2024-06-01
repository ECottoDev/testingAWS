const port = 5506;
const host = '44.193.226.223'

export async function systemLogin(user, password) {
    try {
        const response = await fetch(`http://${host}:${port}/login/sysLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: user, password: password })
        });
        console.log(await response.json());
        if (!response.ok) {
            throw new Error(` ${response.statusText}`);
        }

        const data = await response.json();
        return {
            success: true,
            data: data
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: error.message
        };
    }
}

export async function getUsers() {
    try {
        const response = await fetch(`http://${host}:${port}/login/getUsers`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
       console.log(data.data);
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function getUsersididi() {
    try {
        const response = await fetch(`http://${host}:${port}/login/getUsers`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
       console.log(data.data);
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}