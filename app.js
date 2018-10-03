require('dotenv').config();
const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const config = require('./src/configs/config')();
const serviceLocator = require('./src/configs/di');
const videoRouter = require('./src/routes/videos');
const Database = require('./src/configs/database');

// itinialize server
const app = express();

// Initialize the database
const database = new Database();
database.connect(config.mongo.port, config.mongo.host, config.mongo.name);

// server settings
app.set('port', config.app.port);

// middlewares
app.use(helmet());
app.use(bodyParser.json());

// routing
app.use(videoRouter.register(express, serviceLocator));

// error handling
app.use((error, req, res, next) => {
  res.status(error.httpStatusCode || 500).json({
    stack: error.stack,
    error,
  });
});

module.exports = app;
