// 404 handler - catches any unmatched route
function notFound(req, res, next) {
    res.status(404).json({
        statusCode: 404,
        message: `Route not found: ${req.method} ${req.path}`,
    });
}

// Global error handler - catches any error thrown with next(err)
// Express identifies this as an error handler because it has 4 params (err, req, res, next)
function errorHandler(err, req, res, next) {
    console.error(`[ERROR] ${err.message}`);
    res.status(err.status || 500).json({
        statusCode: err.status || 500,
        message: err.message || 'Internal server error',
    });
}

module.exports = {notFound, errorHandler};