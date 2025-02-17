import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: { 
        type: String,
        required : true
    }
})

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);