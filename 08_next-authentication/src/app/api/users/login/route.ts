import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        await dbConnect(); //connect db
        const { email, password } = await req.json(); // user request
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: true, msg: "user not found", status: 404 });
        }

        // Check if email is verified
        if (!user.isVerified) {
            return NextResponse.json({ error: true, msg: "Please verify your email to log in" }, { status: 400 });
        }

        // Compare Password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ error: true, msg: "your password is incorrect", status: 401 });
        }

        // Generate JWT Token 
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY! as string, { expiresIn: '1h' });

        const response = NextResponse.json({
            error: false,
            msg: "login successfully",
            user: user,
            token,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error) {
        return NextResponse.json({ error: true, msg: (error as Error).message });
    }
}

