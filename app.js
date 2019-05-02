const express = require('express');
const app = express();
require('dotenv').config();
global.fetch = require(`node-fetch`);

const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./connections/localMongoConnection.js');
const usersRouter = require('./routes/usersRouter.js');
const hallRouter = require('./routes/hallRouter.js');
const ticketRouter = require('./routes/ticketRouter.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', usersRouter);
app.use('/', hallRouter);
app.use('/', ticketRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server runs on http://localhost:${process.env.PORT}; Ctrl+C for exit `);
    connectDB();
});
