import { type NextRequest, NextResponse } from "next/server"
import { Routes } from "@/lib/constants/routes"
import { base62 } from "@/lib/infrastructure/coders/base62"
import { QueryParams } from "@/lib/constants/query-params"
import { withLocale } from "@/lib/infrastructure/helpers/http/cookies/locale"
import { withCSRFTokenCookie } from "@/lib/infrastructure/helpers/http/cookies/csrf"
import {
  checkSession,
  renewSession,
} from "@/lib/infrastructure/helpers/http/cookies/session"
import { isPublic } from "@/lib/infrastructure/helpers/http/routes"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
  runtime: "nodejs",
}

export const middleware = async (request: NextRequest) => {
  const daysLeft = await checkSession(request)
  let response: NextResponse
  let renewing = false
  if (daysLeft === -1) {
    if (isPublic(request.nextUrl.pathname)) response = NextResponse.next()
    else {
      const redirectURL = new URL(Routes.SignIn, request.nextUrl)
      const next = base62.encode(
        request.nextUrl.pathname + request.nextUrl.search,
      )
      redirectURL.searchParams.set(QueryParams.Next, next)
      response = NextResponse.redirect(redirectURL)
    }
  } else {
    if (daysLeft <= 3) renewing = true
    if (request.nextUrl.pathname.startsWith(Routes.SignIn))
      response = NextResponse.redirect(
        new URL(Routes.TenantSelection, request.nextUrl),
      )
    else response = NextResponse.next()
  }
  response = await withLocale(response!)
  response = await withCSRFTokenCookie(request, response)
  if (renewing) await renewSession(request, response)
  return response
}
