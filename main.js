// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./service/routes');

dotenv.config();
const app = express();
const port = process.env.PORT || 5050;

app.use(cors({
	origin:'*';
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
