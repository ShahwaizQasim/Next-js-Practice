import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { token, password1, password2 } = await req.json();

    // password match validation
    if (password1 !== password2) {
      return NextResponse.json(
        {
          error: true,
          message: "Password do not match",
        },
        { status: 400 }
      );
    }

    let userId;
    let decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    userId = decoded.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        {
          error: false,
          message: "User Not Found",
        },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password1, 10);

    await UserModel.findByIdAndUpdate(userId, { password: hashedPassword});

    return NextResponse.json(
      {
        error: false,
        message:
          "Password reset successful. You will be redirected to the login page.",
      },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json(
      {
        error: true,
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
