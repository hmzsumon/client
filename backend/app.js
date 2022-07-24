const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');

const errorMiddleware = require('./middleware/error');

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const users = require('./routes/userRoute');
const deposits = require('./routes/depositRoute');

const withdraw = require('./routes/withdrawRoute');
const company = require('./routes/companyRoute');
const agent = require('./routes/agentRoute');
const dailyWork = require('./routes/dailyWorkRoute');
const tnx = require('./routes/tnxRoute');
const package = require('./routes/packageRoute');

app.use('/api/v1', users);
app.use('/api/v1', deposits);

app.use('/api/v1', withdraw);
app.use('/api/v1', company);
app.use('/api/v1', agent);
app.use('/api/v1', dailyWork);
app.use('/api/v1', tnx);
app.use('/api/v1', package);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

// Middleware for Errors

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });
app.use(errorMiddleware);

module.exports = app;
