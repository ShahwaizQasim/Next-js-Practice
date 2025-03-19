import { sendEmail } from "@/helpers/mailer";
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email } = await request.json();
    const user = await UserModel.findOne({ email });
    console.log(user);

    if (!user) {
      return NextResponse.json(
        { error: true, msg: "User Not Found" },
        { status: 400 }
      );
    }
    await sendEmail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json(
      { error: false, msg: "Email Verified Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, msg: (error as Error).message },
      { status: 400 }
    );
  }
}
