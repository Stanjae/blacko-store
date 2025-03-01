/* import { NextAuthRequest } from './../../node_modules/next-auth/lib/index.d';
import { auth } from "@/auth"
 
export default auth((req:NextAuthRequest) => {
  // req.auth
  console.log("req", req)
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} */


import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { NextRequest } from "next/server"
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
  console.log('req: ', req)
  
})