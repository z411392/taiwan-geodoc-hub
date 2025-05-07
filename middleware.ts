import { type NextRequest, NextResponse } from "next/server"
import { LocaleCookie } from "./i18n"
import { getLocale } from "next-intl/server"
import { Routes, PublicRoutes } from "@/lib/constants/routes"
import Base62 from "@/lib/infrastructure/coder/base62"
import { Cookies } from "@/lib/constants/cookies"
import { QueryParams } from "@/lib/constants/query-params"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}

const withLocaleCookie = async (response: NextResponse) => {
  const locale = await getLocale()
  response.cookies.set(LocaleCookie, locale)
  return response
}

const isPublic = (pathname: string) => {
  for (const route of PublicRoutes) {
    if (pathname.startsWith(route)) return true
  }
  return false
}

const base62 = new Base62()

const checkSession = async (_: string | undefined) => {
  // if (!session) return false
  return true
}

export const middleware = async (request: NextRequest) => {
  const session = request.cookies.get(Cookies.Session)?.value
  const isSessionAvailable = await checkSession(session)
  let response: NextResponse
  if (isSessionAvailable) {
    if (request.nextUrl.pathname.startsWith(Routes.SignIn))
      response = NextResponse.redirect(
        new URL(Routes.TenantSelection, request.nextUrl),
      )
    else response = NextResponse.next()
  } else {
    if (isPublic(request.nextUrl.pathname)) response = NextResponse.next()
    else {
      const redirectUrl = new URL(Routes.SignIn, request.nextUrl)
      const next = base62.encode(
        request.nextUrl.pathname + request.nextUrl.search,
      )
      redirectUrl.searchParams.set(QueryParams.Next, next)
      response = NextResponse.redirect(redirectUrl)
    }
  }
  return await withLocaleCookie(response!)
}
