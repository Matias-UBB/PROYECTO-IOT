export async function connectToDatabase() {
    const mongoose = require('mongoose');

    if (!process.env.MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }

    return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    


}