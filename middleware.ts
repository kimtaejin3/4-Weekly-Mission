import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("accessToken")?.value;
  if (request.nextUrl.pathname === "/folder") {
    if (!cookie) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
  if (request.nextUrl.pathname === "/signin") {
    if (cookie) {
      return NextResponse.redirect(new URL("/folder", request.url));
    }
  }
}

export const config = {
  matcher: ["/folder", "/signin", "/signup"],
};
