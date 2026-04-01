const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });  // load .env FIRST before anything else
const app = require('./app');
const {connectDB} = require('./config/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀  Server running on http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error(`❌  Failed to start server: ${err && err.message ? err.message : String(err)}`);
        if (err && err.stack) console.error(err.stack);
        process.exit(1);
    }
}

startServer();