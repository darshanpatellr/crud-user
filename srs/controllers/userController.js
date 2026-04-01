const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// POST /api/users  →  Create a new user
async function createUser(req, res) {
    const {name, email, password, address} = req.body;

    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({
            statusCode: 409,
            message: `User already exists with email: ${email}`,
        });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

    const userId = await userModel.createUser({name, email, password: hashedPassword, address});

    return res.status(201).json({
        statusCode: 201,
        message: 'User created successfully',
        data: {userId, name, email},
    });
}

// GET /api/users  →  Return all users
async function getAllUsers(req, res) {
    const users = await userModel.findAllUsers();
    return res.status(200).json({
        statusCode: 200,
        message: 'Users fetched successfully',
        data: {count: users.length, users},
    });
}

// GET /api/users/profile/:userId  →  Return one user by ID
async function getUserById(req, res) {
    const user = await userModel.findUserById(req.params.userId);
    if (!user) {
        return res.status(404).json({
            statusCode: 404, message: 'User not found'
        });
    }

    return res.status(200).json({
        statusCode: 200,
        message: 'User fetched successfully',
        data: user
    });
}

// GET /api/users/search?q=
async function searchUsers(req, res) {
    const {q} = req.query;
    const users = await userModel.searchUsersByName(q);
    return res.status(200).json({
        statusCode: 200,
        message: `Search results for: "${q}"`,
        data: {
            count: users.length,
            users
        },
    });
}

// GET /api/users/sort  →  Return users sorted by name A→Z
async function getSortedUsers(req, res) {
    const users = await userModel.getAllUsersSortedByName();
    return res.status(200).json({
        statusCode: 200,
        message: 'Users sorted by name A→Z',
        data: {
            count: users.length,
            users
        },
    });
}

// DELETE /api/users/:id  →  Delete user by ID
async function deleteUser(req, res) {
    const result = await userModel.deleteUserById(req.params.userId);
    if (!result) {
        return res.status(404).json({statusCode: 404, message: 'Invalid user ID'});
    }
    if (result.deletedCount === 0) {
        return res.status(404).json({statusCode: 404, message: 'User not found'});
    }
    return res.status(200).json({statusCode: 200, message: 'User deleted successfully'});
}

// PUT /api/users/:id  →  Update user name and address
async function updateUser(req, res) {
    const {name, address} = req.body;

    const result = await userModel.updateUserById(req.params.userId, {
        name: name,
        address: address,
    });
    if (!result) {
        return res.status(400).json({statusCode: 400, message: 'Invalid user ID'});
    }
    if (result.matchedCount === 0) {
        return res.status(404).json({statusCode: 404, message: 'User not found'});
    }

    return res.status(200).json({statusCode: 200, message: 'User updated successfully'});
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    searchUsers,
    getSortedUsers,
    deleteUser,
    updateUser
};