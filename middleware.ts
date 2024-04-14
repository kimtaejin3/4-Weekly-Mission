import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("accessToken")?.value;
  if (request.nextUrl.pathname === "/folder") {
    if (!cookie) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
  const prev = request.nextUrl.host;
  if (
    request.nextUrl.pathname === "/signin" ||
    request.nextUrl.pathname === "/signup"
  ) {
    if (cookie) {
      return NextResponse.redirect(prev);
    }
  }
}

export const config = {
  matcher: ["/folder", "/signin", "/signup"],
};
