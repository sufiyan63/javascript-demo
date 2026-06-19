const cds = require('@sap/cds');
const express = require('express');
const bookRouter = require('./routes/book');

//const app = express();

cds.on('bootstrap', (app) => {
    app.use(express.json()); // Built-in middleware for parsing JSON
    app.use('/api/books', bookRouter); // Mount the book router at /api/books
});

module.exports = cds.server;
