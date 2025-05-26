import { decodeToken } from "@/utils/decodeToken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  // Check if token is authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {

    const decoded = decodeToken(token);


    if (!decoded || !decoded.userId || !decoded.role) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRole = decoded.role;
    const pathName = request.nextUrl.pathname;

    if (pathName.startsWith("/admin") && userRole !== "admin") {
       return NextResponse.redirect(new URL("/login", request.url));
    }

     if (pathName.startsWith("/user") && userRole !== "customer") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
 
    return NextResponse.next();
    
  } catch (error) {
    console.error("Error validating token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
    
  }
}

// See "Matching Paths" below to learn more
export const config = {
 matcher: ["/admin/:path*", "/user/:path*"],
};
