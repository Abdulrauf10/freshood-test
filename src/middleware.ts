import axios from "axios"
import { NextResponse, NextRequest } from "next/server"
import { AUTH } from "./config/endpoint"

const protectedRoutes = ["/account-review", "/forgot-password", "/merchant"]
const authRoutes = ["/", "/register"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionId = request.cookies.get("sessionid")
  let isTokenValid: boolean = false

  if (sessionId && pathname !== "/") {
    const temp = await axios.get(AUTH.ME, {
      headers: {
        Cookie: `sessionid=${sessionId?.value}`
      },
      withCredentials: true
    })
    isTokenValid = temp.status === 200
  }

  if (protectedRoutes.some((path) => pathname.startsWith(path))) {
    if (!isTokenValid) {
      const loginUrl = new URL("/", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (authRoutes.includes(pathname)) {
    if (isTokenValid) {
      const dashboardUrl = new URL("/merchant/my-account", request.url)
      return NextResponse.redirect(dashboardUrl)
    }
  }

  return NextResponse.next()
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
