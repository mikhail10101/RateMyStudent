import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
    pages: {
        signIn: '/'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnEntrance = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/signup')
            const IsOnCreate = nextUrl.pathname.startsWith('/create')
            const IsOnRate = nextUrl.pathname.endsWith('rate') || nextUrl.pathname.endsWith('rate/')
            const IsOnAccount = nextUrl.pathname.startsWith('/account')
            const IsOnEditRating = nextUrl.pathname.startsWith('/edit/rating')

            if (IsOnCreate || IsOnRate || IsOnAccount || IsOnEditRating ) {
                if (isLoggedIn) return true
                return Response.redirect(new URL('/login', nextUrl))
            } else if (isOnEntrance) {
                if (isLoggedIn) return false
                return true
            } 
            return true
        },
        session({ session, user }) {
            return session
        }
    },
    providers: [],
} satisfies NextAuthConfig