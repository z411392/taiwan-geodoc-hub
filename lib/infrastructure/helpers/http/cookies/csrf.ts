import { type NextRequest, NextResponse } from "next/server"
import { Cookies } from "@/lib/constants/cookies"
import { generateCSRFToken } from "@/lib/infrastructure/generators/csrf"

export const getCSRFToken = (request: NextRequest) =>
  request.cookies.get(Cookies.CSRFToken.name)?.value

export const withCSRFTokenCookie = async (
  request: NextRequest,
  response: NextResponse,
  override?: boolean,
) => {
  if (!override) {
    const token = getCSRFToken(request)
    if (token) return response
  }
  const csrfToken = generateCSRFToken()
  const { name, maxAge } = Cookies.CSRFToken
  response.cookies.set(name, csrfToken, { maxAge })
  return response
}
