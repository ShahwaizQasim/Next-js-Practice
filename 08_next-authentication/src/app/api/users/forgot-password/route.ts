import { UserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: true, msg: "User Not Found" }, { status: 400 })
        }
    } catch (error) {

    }
}