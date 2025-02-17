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
            return NextResponse.json({ error: false, msg: "user not found", status: 404 });
        }

        // Compare Password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ error: true, msg: "your password is incorrect", status: 401 });
        }

        // Generate JWT Token 
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });

        return NextResponse.json({
            error: false,
            msg: "user login successfully",
            user: user,
            token,
        })

    } catch (error) {
        return NextResponse.json({ error: false, msg: (error as Error).message });
    }
}

