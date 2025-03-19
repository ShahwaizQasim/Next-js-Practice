import mongoose, { Schema } from "mongoose";
import { boolean } from "zod";

const UserSchema = new Schema({
    userName: {
        type: String,
        required: [true, "please provide a password"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "please provide a email"]
    },
    password: {
        type: String,
        required: [true, "please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

},
    {
        timestamps: true
    }
)

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)