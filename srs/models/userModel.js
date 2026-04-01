const {ObjectId} = require('mongodb');
const {getDB} = require('../config/db');

const collection = () => getDB().collection('users');

async function createUser(userData) {
    const result = await collection().insertOne(userData);
    return result.insertedId;
}

async function findUserByEmail(email) {
    return await collection().findOne({email});
}

async function findAllUsers() {
    return await collection().find({}).toArray();
}

async function findUserById(userId) {
    if (!ObjectId.isValid(userId)) return null;
    return await collection().findOne({
        _id: new ObjectId(userId)
    });
}

async function searchUsersByName(q) {
    return await collection().find({name: new RegExp(q, 'i')}).toArray();
}

async function getAllUsersSortedByName() {
    return await collection().find().sort({name: 1}).toArray();
}

async function deleteUserById(userId) {
    if (!ObjectId.isValid(userId)) return null;
    return await collection().deleteOne({
        _id: new ObjectId(userId)
    });
}

async function updateUserById(userId, userData) {
    if (!ObjectId.isValid(userId)) return null;
    return await collection().updateOne({
        _id: new ObjectId(userId)
    }, {
        $set: userData
    });
}

module.exports = {
    createUser,
    findUserByEmail,
    findAllUsers,
    findUserById,
    searchUsersByName,
    getAllUsersSortedByName,
    deleteUserById,
    updateUserById
};