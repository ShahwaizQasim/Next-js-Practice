import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log("MongoDB connected");
        })
        connection.on('error', (err)=>{
            console.log("MongoDB connection Failed", err);
            process.exit(); // ka use error ke case mein application ko immediately band karne ke liye kiya jata hai.
        })
        console.log("MongoDB Connected");

    } catch (error) {
        console.log((error as Error).message, "MongoDB connection Failed");
    }
}

export {
    dbConnect
}