import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import UseSessionStore from "./store/useSessionStore"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const userToken = request.cookies.get("sessionid")
  // const { sessionId } = UseSessionStore()

  // if (path === "/" && sessionId) {
  //   // If user is already logged in and tries to access login page, redirect to home
  //   return NextResponse.redirect(new URL("/merchant/my-account", request.url))
  // } else if (path.includes("/merchant") && !sessionId) {
  //   // If user tries to access protected route without token, redirect to login
  //   return NextResponse.redirect(new URL("/", request.url))
  // } else if (!sessionId) {
  //   // If user tries to access any protected route without token, redirect to login
  //   return NextResponse.redirect(new URL("/", request.url))
  // } else {
  //   return NextResponse.next()
  // }
}

// protected routes
export const config = {
  matcher: [
    "/",
    "/register",
    "/account-review",
    "/forgot-password",
    "/merchant/:path*"
  ]
}
