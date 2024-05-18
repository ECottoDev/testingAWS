/**
* budgetDatabase.js
*
* @author Edwin Cotto <cottosoftwaredevelopment@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-May-14 initial version
*/
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

class BudgetDatabase {
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

    async getAllCardData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM BudgetData;";
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

    async insertNewName(name) {
        try {
            const amountDue = 0;
            const amountMinDue = 0;
            const cardName = name;
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO BudgetData (cardName, amountDue, amountMinDue) VALUES (?,?,?); ;";
                this.connection.query(query, [cardName, amountDue, amountMinDue], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })

            return {
                cardID: response.insertId,
                cardName: name,
                amountDue: amountDue,
                amountMinDue: amountMinDue

            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async updateCard(id, amountDue) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE BudgetData SET amountDue = ? WHERE cardID = ?";

                this.connection.query(query, [amountDue, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM BudgetData WHERE cardName = ?;";

                this.connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getBudget() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM budgetformonth;";
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
    async updateBudget(amount) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE budgetformonth SET budget = ?";

                this.connection.query(query, [amount], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getBank() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM currentBankAmount;";
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

    async updateBank(amount) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE currentBankAmount SET currentBankAmount = ?";

                this.connection.query(query, [amount], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
module.exports = new BudgetDatabase();
