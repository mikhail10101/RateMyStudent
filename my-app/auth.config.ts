import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const IsOnCreate = nextUrl.pathname.startsWith('/create/profile')
            if (IsOnCreate) {
                if (isLoggedIn) return true
                return false
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl))
            }
            return true
        }
    },
    providers: []
} satisfies NextAuthConfig