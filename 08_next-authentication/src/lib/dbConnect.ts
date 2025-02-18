import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB already connected ");
        }
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB Connected");

    } catch (error) {
        console.log((error as Error).message, "MongoDB connection Failed");
    }
}

export {
    dbConnect
}