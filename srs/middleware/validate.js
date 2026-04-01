const {ObjectId} = require('mongodb');

// Validates POST /api/users body
function validateCreateUser(req, res, next) {

    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            statusCode: 400,
            message: 'name, email, and password are all required',
        });
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Invalid email format'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Password must be at least 6 characters'
        });
    }

    next(); // ✅ All good → pass to controller
}

// Validates :id route params
function validateObjectId(req, res, next) {
    const userId = req.params.userId;
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({statusCode: 400, message: `Invalid ID format: ${userId}`});
    }
    next();
}

// Validates :id route params
function validateSearchQuery(req, res, next) {
    const q = req.query.q;
    if (isEmpty(q)) {
        return res.status(400).json({statusCode: 400, message: `Search query cannot be empty: ${q}`});
    }
    next();
}

function isEmpty(value) {
    if (value === undefined || value === null) {
        return true;
    }
    return typeof value === "string" && value.trim().length === 0;
}


module.exports = {
    validateCreateUser,
    validateObjectId,
    validateSearchQuery,
    isEmpty
}