const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

class LoginDatabase {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: process.env.DB_PORT
        });

        this.connection.connect((err) => {
            if (err) throw err;
            console.log('Connected to Budget database!');
        });
    }

    async getUsers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users;";
                this.connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }

    async logIntoSystem(username, password) {
        try {
            console.log(username, password);
            const user = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM users WHERE userName = ?';
                db.query(query, [username], (err, results) => {
                    if (err) {
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
            console.log(err);
            throw err;
        }
    }
    

}
module.exports = new LoginDatabase();