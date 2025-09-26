import { type NextRequest, NextResponse } from "next/server"

// TODO: Implement logging middleware
// REMOVE BEFORE HANDOVER: The code below is a complete implementation - remove it and let the candidate write their own
export function middleware(request: NextRequest) {
  const start = Date.now()

  // Log the request
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`)

  const response = NextResponse.next()

  // Add request duration to response headers
  const duration = Date.now() - start
  response.headers.set("X-Response-Time", `${duration}ms`)

  // Log completion
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url} - ${duration}ms`)

  return response
}

export const config = {
  matcher: "/api/:path*",
}
// END OF CODE TO REMOVE
