require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

let isConnected = false;

const connectToDatabase = async () => {
    if (isConnected) {
        console.log("Already connected to MongoDB.");
        return;
    }

    console.log("Trying to connect DB...");
    const currentDate = new Date().toString();

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;

        const dbInfo = {
            status: 'Connected to the database',
            host: mongoose.connection.host,
            DB: mongoose.connection.name,
            Time: currentDate
        };

        console.table(dbInfo);
        console.log("MongoDB Connection Successful");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process on connection failure
    }
};

module.exports = { connectToDatabase };