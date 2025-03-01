import { GetDataFromToken } from "@/helpers/getDataFromToken";
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const userId = await GetDataFromToken(req);
    if (userId) {
      return NextResponse.json(
        { error: true, msg: "Invalid User Id" },
        { status: 400 }
      );
    }
    const user = await UserModel.findOne({ userId }).select("-password");
    if (!user) {
      return NextResponse.json(
        { error: true, msg: "user not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      error: false,
      msg: "User Found",
      user,
    });
  } catch (error) {
    return NextResponse.json({ error: true, msg: (error as Error).message });
  }
}
