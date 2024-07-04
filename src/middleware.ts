
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/chat"];

export default function middleware(req: NextRequest) {
  const isAuthenticated = true
  console.log(req)
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
