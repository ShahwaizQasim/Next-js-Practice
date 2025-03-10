import { sendEmail } from "@/helpers/mailer";
import { UserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: true, msg: "User Not Found" }, { status: 400 })
        }
        await sendEmail({ email, emailType: "RESET", userId: user._id });
        return NextResponse.json({ error: false, msg: "Email Verified Successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: true, msg: (error as Error).message }, { status: 400 })
    }
}