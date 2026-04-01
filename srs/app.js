const express = require('express');
const userRoutes = require('./routes/userRoutes');
const {notFound, errorHandler} = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/users', (req, res, next) => {
    next();
}, userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;