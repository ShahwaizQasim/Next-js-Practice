import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { userName, email, password } = await req.json()

        // chack if user already exist
        const existedUser = await UserModel.findOne({ email });
        if (existedUser) {
            return NextResponse.json({ error: true, msg: "user already exists", status: 400 });
        }

        // Hash password using bcryptjs
        const hashPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword", hashPassword);

        // create new user 
        let user = new UserModel({userName, email, password: hashPassword});
        user = await user.save();

        console.log("Recieved Data", { userName, email, hashPassword });
        return NextResponse.json({ error: false, msg: "user added successfully" });
    } catch (error) {
        return NextResponse.json({ error: false, msg: (error as Error).message });
    }
} 