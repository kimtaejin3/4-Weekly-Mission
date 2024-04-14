import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getCookie } from "./utils/cookie";
// react-cookie로 getCookie를 하면 undefined

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("accessToken")?.value;
  if (!cookie) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: "/folder",
};
