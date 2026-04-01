const express = require('express');
const userRoutes = require('./routes/userRoutes');
const {notFound, errorHandler} = require('./middleware/errorHandler');
const {loggerMiddleware} = require('./middleware/loggerMiddleware');

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/users', (req, res, next) => {
    next();
}, userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;