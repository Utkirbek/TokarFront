import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (
    path.startsWith("/api") ||
    path.startsWith("/static") ||
    path.includes(".") ||
    path.startsWith("/_next") ||
    path.startsWith("/_error")
  ) {
    return NextResponse.next();
  } else {
    const token = request.cookies.get("token");
    const shopId = request.cookies.get("shopId");
    const isLoggedIn = request.cookies.get("isLoggedIn");
    if (
      (!token || !shopId || !isLoggedIn) &&
      !request.nextUrl.pathname.includes("/auth/sign-in")
    ) {
      return NextResponse.rewrite(new URL("/auth/sign-in", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  mather: "/((?!api|static|favicon.ico).*)",
};
