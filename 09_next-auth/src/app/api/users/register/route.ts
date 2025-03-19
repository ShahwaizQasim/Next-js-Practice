import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { userName, email, password } = await req.json();

        // chack if user already exist
        const existedUser = await UserModel.findOne({ email });
        if (existedUser) {
            return NextResponse.json({ error: true, msg: "user already exists" }, { status: 400 });
        }

        // Hash password using bcryptjs
        const hashPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword", hashPassword);

        // create new user 
        let user = new UserModel({ userName, email, password: hashPassword });
        user = await user.save();
        console.log("User", user);

        // send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: user._id })

        console.log("Recieved Data", { userName, email, hashPassword });
        return NextResponse.json({ error: false, msg: "user created successfully", user }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: true, msg: (error as Error).message }, { status: 500 });
    }
} 