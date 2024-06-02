const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

class LoginDatabase {
    constructor() {
        const connectionConfig = {
            host: process.env.HOST,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: process.env.DB_PORT
        };
        
        this.connection = mysql.createConnection(connectionConfig);

        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to the database:', err);
                throw err;
            }
            console.log('Connected to Budget database!');
        });
    }

    async getUsers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users;";
                this.connection.query(query, (err, results) => {
                    if (err) {
                        console.error('Error fetching users:', err);
                        return reject(new Error(err.message));
                    }
                    resolve(results);
                });
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err; // Re-throw the error to handle it in the caller
        }
    }

    async logIntoSystem(username, password) {
        try {
            console.log('Attempting login for user:', username);
            const user = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM users WHERE userName = ?';
                this.connection.query(query, [username], (err, results) => {
                    if (err) {
                        console.error('Error in login query:', err);
                        return reject(new Error('Error in login'));
                    }
                    if (results.length === 0) {
                        return reject(new Error('User not found'));
                    }
                    resolve(results[0]);
                });
            });

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (isPasswordValid) {
                return { message: 'Login successful' };
            } else {
                throw new Error('Invalid password');
            }
        } catch (err) {
            console.error('Login error:', err.message);
            throw new Error('Login failed');
        }
    }
}

module.exports = new LoginDatabase();
