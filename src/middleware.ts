import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/chat"];
const nonAuthRoutes = ["/register", "/"];

export default function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get("token");
  if (isAuthenticated && nonAuthRoutes.includes(req.nextUrl.pathname)) {
    const chatRoute = new URL("/chat", req.nextUrl.origin);
    return NextResponse.redirect(chatRoute.toString());
  }

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
