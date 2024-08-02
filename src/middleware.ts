import { getCookies } from "cookies-next";
import { getSession, useSession } from "next-auth/react";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/chat", "/users", "/chat/*"];
const nonAuthRoutes = ["/register", "/"];

export default function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const isAuthenticated =
    cookieStore.get("token") ||
    cookieStore.get("next-auth.session-token") ||
    cookieStore.get("_vercel_jwt");

  const path = req.nextUrl.pathname;
  if (isAuthenticated && nonAuthRoutes.includes(req.nextUrl.pathname)) {
    const chatRoute = new URL("/chat", req.nextUrl.origin);
    return NextResponse.redirect(chatRoute.toString());
  }

  if (
    !isAuthenticated &&
    protectedRoutes.some((route) => path.startsWith(route))
  ) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
