const port = 5506;
const host = 'localhost';

export async function systemLogin(user, password) {
    try {
        const response = await fetch(`http://${host}:${port}/login/sysLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(` ${errorData.message}`);
        }

        const data = await response.json();
        console.log(data);
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
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
