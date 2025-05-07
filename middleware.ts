import { type NextRequest, NextResponse } from "next/server"
import {
    APIRoutes,
    Pages,
} from "@/taiwan-geodoc-hub/infrastructure/constants/routes"
import { Locale } from "@/taiwan-geodoc-hub/infrastructure/constants/cookies"
import { getLocale } from "next-intl/server"
import { PublicPages } from "@/taiwan-geodoc-hub/infrastructure/constants/routes"
import { authMiddleware, redirectToPath } from "next-firebase-auth-edge"
import { type InvalidTokenReason } from "next-firebase-auth-edge/auth"
import { Base62Encoder } from "@/taiwan-geodoc-hub/infrastructure/utils/encoders/base62-encoder"
import * as authConfig from "~/auth.config"

export const isPublic = (pathname: string) => {
    for (const route of PublicPages) {
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
    const redirectURI = new URL(Pages.SignIn, request.nextUrl)
    const next = request.nextUrl.pathname + request.nextUrl.search
    redirectURI.searchParams.set("next", base62.encode(next))
    return NextResponse.redirect(redirectURI)
}

const onTokenValid = async (
    request: NextRequest,
    existingResponse?: NextResponse,
) => {
    const isSigninIn = request.nextUrl.pathname.startsWith(Pages.SignIn)
    if (!isSigninIn) return existingResponse || NextResponse.next()

    const next = request.nextUrl.searchParams.get("next")
    let redirectedTo: string
    if (next) redirectedTo = base62.decode(next)
    else redirectedTo = Pages.TenantSelection
    return redirectToPath(request, redirectedTo, {
        shouldClearSearchParams: true,
    })
}

const onError = async (request: NextRequest, _thrown: unknown) => {
    // const error =
    //     thrown instanceof Error
    //         ? thrown.message
    //         : JSON.stringify(thrown, null, 2)
    return NextResponse.redirect(new URL(Pages.SignIn, request.nextUrl))
}

const shouldPass = (pathname: string) => {
    if (pathname.startsWith("/_next")) return true
    if (pathname.startsWith("/api")) {
        if (pathname === APIRoutes.SignIn) return false
        if (pathname === APIRoutes.SignOut) return false
        return true
    }
    if (pathname.startsWith("/favicon.ico")) return true
    if (pathname.startsWith("/.well-known")) return true
    return false
}

export const middleware = async (request: NextRequest) => {
    if (shouldPass(request.nextUrl.pathname)) return NextResponse.next()
    const response = authMiddleware(request, {
        loginPath: APIRoutes.SignIn,
        logoutPath: APIRoutes.SignOut,
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
