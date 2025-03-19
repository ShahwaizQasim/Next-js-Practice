import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {

        const response = NextResponse.json({
            error: false,
            msg: "Logout Successfully",
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        })

        return response;

    } catch (error: any) {
        NextResponse.json({ error: true, msg: (error as Error).message, }, { status: 500 })
    }
}