import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"

const { auth: middleware } = NextAuth(authConfig)
const publicRoutes =[
    "/",
    "/login",
    "/register",
    "/api/auth/verify-email",
    
]
export default middleware((req)=>{
   const {nextUrl, auth} = req;
   const isLoggedIn = !!auth?.user
   if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("login", nextUrl))
    }

    return NextResponse.next();
   
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};