import { type NextRequest, NextResponse } from "next/server"
import { app } from "@/lib/infrastructure/providers/firebase-admin"
import {
  getSession,
  destroySession,
} from "@/lib/infrastructure/helpers/http/cookies/session"
import { checkCSRFToken } from "@/lib/infrastructure/helpers/http/validations/csrf"

export async function POST(request: NextRequest) {
  const sessionCookie = getSession(request)
  const response = destroySession(NextResponse.json({}))
  try {
    await checkCSRFToken(request)
    if (!sessionCookie) return response
    const { sub } = await app.auth().verifySessionCookie(sessionCookie, true)
    app.auth().revokeRefreshTokens(sub)
    return response
  } catch {
    return response
  }
}
