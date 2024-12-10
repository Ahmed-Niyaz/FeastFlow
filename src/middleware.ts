import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/sign-in", "/sign-up", "/my-orders", "/place-order", "/verify-payment", "/my-cart", "/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const url = request.nextUrl;

  // Redirect to home page if the user is already authenticated and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/home-page", request.url));
  }

  if (!token && (
    url.pathname.startsWith("/my-orders") || 
    url.pathname.startsWith("/place-order") || 
    url.pathname.startsWith("/my-cart") || 
    url.pathname.startsWith("/verify-payment") ||
    url.pathname.startsWith("/admin")
  )) {
    const redirectUrl = new URL("/sign-in", request.url);
    redirectUrl.searchParams.set("callbackUrl", url.pathname);
    return NextResponse.redirect(redirectUrl);

  }

  return NextResponse.next();
}
