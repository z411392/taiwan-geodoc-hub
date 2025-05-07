import { type NextRequest, NextResponse } from "next/server"
import { AuthAPI } from "@/taiwan-geodoc-hub/modules/general/enums/auth-api"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { Locale } from "@/taiwan-geodoc-hub/modules/general/constants/cookies"
import { getLocale } from "next-intl/server"
import { PublicRoutes } from "@/taiwan-geodoc-hub/modules/general/constants/public-routes"
import { authMiddleware, redirectToPath } from "next-firebase-auth-edge"
import { type InvalidTokenReason } from "next-firebase-auth-edge/auth"
import { Base62Encoder } from "@/taiwan-geodoc-hub/infrastructure/encoders/base62-encoder"
import * as authConfig from "~/auth.config"

export const isPublic = (pathname: string) => {
    for (const route of PublicRoutes) {
        if (pathname.startsWith(route)) return true
    }
    return false
}

export const withLocale = async (handler: () => Promise<NextResponse>) => {
    const response = await handler()
    const locale = await getLocale()
    const { name, maxAge } = Locale
    response.cookies.set(name, locale, { maxAge })
    return response
}

const base62 = new Base62Encoder()

const onTokenInvalid = async (
    request: NextRequest,
    _reason: InvalidTokenReason,
) => {
    const isPublicPath = isPublic(request.nextUrl.pathname)
    if (isPublicPath) return NextResponse.next()
    const redirectURI = new URL(Route.SignIn, request.nextUrl)
    const next = request.nextUrl.pathname + request.nextUrl.search
    redirectURI.searchParams.set("next", base62.encode(next))
    return NextResponse.redirect(redirectURI)
}

const onTokenValid = async (
    request: NextRequest,
    existingResponse?: NextResponse,
) => {
    const isSigninIn = request.nextUrl.pathname.startsWith(Route.SignIn)
    if (!isSigninIn) return existingResponse || NextResponse.next()
    const next = request.nextUrl.searchParams.get("next")
    let redirectedTo: string
    if (next) redirectedTo = base62.decode(next)
    else redirectedTo = Route.TenantSelection
    return redirectToPath(request, redirectedTo, {
        shouldClearSearchParams: true,
    })
}

const onError = async (request: NextRequest, _thrown: unknown) => {
    return NextResponse.redirect(new URL(Route.SignIn, request.nextUrl))
}

const shouldPass = (pathname: string) => {
    if (pathname.startsWith("/_next")) return true
    if (pathname.startsWith("/api")) {
        if (pathname === AuthAPI.SignIn) return false
        if (pathname === AuthAPI.SignOut) return false
        return true
    }
    if (pathname.startsWith("/favicon.ico")) return true
    if (pathname.startsWith("/.well-known")) return true
    return false
}

export const middleware = async (request: NextRequest) => {
    if (shouldPass(request.nextUrl.pathname)) return NextResponse.next()
    const response = authMiddleware(request, {
        loginPath: AuthAPI.SignIn,
        logoutPath: AuthAPI.SignOut,
        ...authConfig,
        handleInvalidToken: (reason) =>
            withLocale(() => onTokenInvalid(request, reason)),
        handleValidToken: (_tokens, headers) => {
            const response = NextResponse.next({
                request: { headers },
            })
            return withLocale(() => onTokenValid(request, response))
        },
        handleError: (error) => withLocale(() => onError(request, error)),
    })
    return response
}
