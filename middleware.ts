import { NextResponse } from "next/server";

export function middleware(req: { cookies: { get: (arg0: string) => any; }; url: string | URL | undefined; }) {
  const login = req.cookies.get("admin"); // Check for "admin" cookie (recommended)

  if (!login) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if not authenticated
  }

  return NextResponse.next(); 
}

// Apply middleware to specific paths
export const config = {
  matcher: ["/Upload","/","/orders","/user"], 
};
