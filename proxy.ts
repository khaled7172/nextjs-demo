import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/books", "/authors", "/publishers"];

export function proxy(request: NextRequest) {
  const auth = request.cookies.get("auth");
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/books/:path*", "/authors/:path*", "/publishers/:path*"],
};
