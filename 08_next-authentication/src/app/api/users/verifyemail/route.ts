import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { token } = await req.json();
        console.log('token', token);

        if (!token) {
            return NextResponse.json({ error: true, msg: "Invalid Token" }, { status: 400 })
        }
        const user = await UserModel.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json({ error: true, msg: "User Does Not Exist" }, { status: 400 })
        }
        console.log("user", user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        
        await user.save();

        return NextResponse.json({
            error: false,
            msg: "Email Verified Successfully",
        })

     

    } catch (error: any) {
        return NextResponse.json({ error: true, msg: (error as Error).message, }, { status: 500 })
    }
}