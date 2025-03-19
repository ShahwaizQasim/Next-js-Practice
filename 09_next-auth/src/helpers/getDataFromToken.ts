import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"


export function GetDataFromToken(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY! as string)
        return decodedToken.id;
    } catch (error) {
        throw new Error((error as Error).message);
    }
} 