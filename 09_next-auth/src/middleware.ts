import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET! || "12345",
  });
  const url = request.nextUrl;

  if (
    (token && url.pathname.startsWith("sign-in")) ||
    url.pathname.startsWith("signup")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && url.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/sign-in", "/signup"],
};
