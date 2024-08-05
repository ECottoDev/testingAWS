// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./service/routes');
const fs = require('fs');
const https = require('https');
const http = require('http');

dotenv.config();
const app = express();
const port = process.env.PORT || 5050;
const portssl = process.env.PORTSSL || 5051;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

const httpServer = http.createServer(app);

const httpsOptions = {
cert: fs.readFileSync('/var/www/html/testingAWS/fullchain.cert'),
	key: fs.readFileSync('/var/www/html/testingAWS/privkey.key'),
};

const httpsServer = https.createServer(httpsOptions, app);

httpServer.listen(port, () => {
  console.log(`HTTP Server is running on port ${port}`);
});

httpsServer.listen(portssl, () => {
  console.log(`HTTPS Server is running on port ${portssl}`);
});

