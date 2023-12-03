import NextAuth from "next-auth"
import { authConfig } from "../auth.config"

export default NextAuth(authConfig).auth

export const config = {
    matcher: ['/create/:path*','/signup','/login','/student/:path*','/search/:path*','/account/:path*','/edit/rating/:path*']
}