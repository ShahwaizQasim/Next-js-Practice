import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { token, password1, password2 } = await req.json();

    // password match validation
    if (password1 !== password2) {
      return NextResponse.json(
        {
          error: false,
          message:
            "Password do not match",
        },
        { status: 200 }
      );
    }

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
      { status: 400 }
    );
  }
}
