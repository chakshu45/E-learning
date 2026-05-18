const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;

        // Check if we should use memory server (if URI is localhost and likely to fail, or not provided)
        if (!uri || uri.includes('localhost')) {
            console.log('Attempting to connect to local MongoDB...');
            try {
                // Try connecting with a short timeout
                await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
                console.log(`MongoDB Connected: ${mongoose.connection.host}`);
                return;
            } catch (err) {
                console.log('Local MongoDB not found. Starting MongoDB Memory Server...');
                const mongod = await MongoMemoryServer.create();
                uri = mongod.getUri();
            }
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // If we are using memory server, we might want to seed it
        if (uri.includes('127.0.0.1')) {
             console.log('In-memory database detected. You may need to run seeding logic.');
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

