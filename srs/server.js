const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });  // load .env FIRST before anything else
const app = require('./app');
const {connectDB} = require('./config/db');

const PORT = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
    console.error(`❌  Uncaught Exception: ${err && err.message ? err.message : String(err)}`);
    if (err && err.stack) console.error(err.stack);
    process.exitCode = 1;
    setTimeout(() => process.exit(1), 250);
});

process.on('unhandledRejection', (reason) => {
    console.error(`❌  Unhandled Rejection: ${reason && reason.message ? reason.message : String(reason)}`);
    if (reason && reason.stack) console.error(reason.stack);
    process.exitCode = 1;
    setTimeout(() => process.exit(1), 250);
});

async function startServer() {
    try {
        console.log('🚀  Starting server...');
        console.log(`🔧  PORT=${PORT}`);

        app.listen(PORT, () => {
            if(PORT==="8080"){
                console.log(`🚀  Server listening on http://localhost:${PORT}`);
            } else{
                console.log(`🚀  Server listening on port ${PORT}`);
            }
        });

        connectDB()
            .then(() => {
                console.log('✅  Database connection established');
            })
            .catch((err) => {
                console.error(`❌  Database connection failed: ${err && err.message ? err.message : String(err)}`);
                if (err && err.stack) console.error(err.stack);
            });

    } catch (err) {
        console.error(`❌  Failed to start server: ${err && err.message ? err.message : String(err)}`);
        if (err && err.stack) console.error(err.stack);
        process.exitCode = 1;
        setTimeout(() => process.exit(1), 250);
    }
}

startServer();