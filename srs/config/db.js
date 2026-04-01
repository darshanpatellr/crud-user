const {MongoClient} = require('mongodb');

//  Single shared client instance (connection pooling)
let client;
let connectPromise;

async function connectDB() {
    if (client) return client;
    if (connectPromise) return connectPromise;

    if (!process.env.MONGO_URI) {
        throw new Error('Missing required environment variable: MONGO_URI');
    }

    connectPromise = (async () => {
        const nextClient = new MongoClient(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        });

        await nextClient.connect();
        client = nextClient;
        console.log('✅  Connected to MongoDB Atlas');
        return client;
    })();

    try {
        return await connectPromise;
    } finally {
        connectPromise = undefined;
    }
}

function getDB() {
    if (!client) throw new Error('Database not connected yet. Call connectDB() first.');
    if (!process.env.DB_NAME) {
        throw new Error('Missing required environment variable: DB_NAME');
    }
    return client.db(process.env.DB_NAME);
}

module.exports = {connectDB, getDB};