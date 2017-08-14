const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = require('./router');

// DB setup
const DB_CONN = 'mongodb://localhost:27017/GoodEats';
mongoose.Promise = global.Promise;
mongoose.connect(DB_CONN);

// App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server setup
const port = process.env.PORT || 3091;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening at port ${port}`);