const {MongoClient} = require('mongodb');

//  Single shared client instance (connection pooling)
let client;

async function connectDB() {
    if (client) return client;

    if (!process.env.MONGO_URI) {
        throw new Error('Missing required environment variable: MONGO_URI');
    }

    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log('✅  Connected to MongoDB Atlas');
    return client;
}

function getDB() {
    if (!client) throw new Error('Database not connected. Call connectDB() first.');
    if (!process.env.DB_NAME) {
        throw new Error('Missing required environment variable: DB_NAME');
    }
    return client.db(process.env.DB_NAME);
}

module.exports = {connectDB, getDB};