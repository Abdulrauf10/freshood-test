import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const userToken = request.cookies.get("sessionid")
  console.log("token", request.headers)
  // if (path === "/login" && userToken) {
  //   // If user is already logged in and tries to access login page, redirect to home
  //   return NextResponse.redirect(new URL("/", request.url))
  // }
  // // else if (path.includes("/call") && !userToken) {
  // //   // If user tries to access protected route without token, redirect to login
  // //   return NextResponse.redirect(new URL("/login", request.url))
  // // } else if (path.includes("/calling") && !userToken) {
  // //   return NextResponse.redirect(new URL("/login", request.url))
  // // }
  // else if (!userToken && !path.startsWith("/login")) {
  //   // If user tries to access any protected route without token, redirect to login
  //   return NextResponse.redirect(new URL("/login", request.url))
  // } else {
  //   return NextResponse.next()
  // }
}

// protected routes
export const config = {
  matcher: [
    "/login",
    "/"
    // "/call/:path*", "/calling/:path*"
  ]
}
