import { type NextRequest, NextResponse } from "next/server"
import { Cookies } from "@/lib/constants/cookies"
import { app } from "@/lib/infrastructure/providers/firebase-admin"

export const getSession = (request: NextRequest) => {
  const { name } = Cookies.Session
  return request.cookies.get(name)?.value
}

export const checkSession = async (request: NextRequest) => {
  const sessionCookie = getSession(request)
  if (!sessionCookie) return -1
  try {
    const { exp } = await app.auth().verifySessionCookie(sessionCookie, true)
    const now = Math.floor(Date.now() / 1000)
    const daysLeft = Math.floor((exp - now) / 86400)
    return daysLeft
  } catch {
    return -1
  }
}

export const renewSession = async (
  request: NextRequest,
  response: NextResponse,
) => {
  const sessionCookie = getSession(request)
  if (!sessionCookie) return response
  const { idToken } = await app.auth().verifySessionCookie(sessionCookie)
  const newSessionCookie = await createSession(idToken)
  return withSession(response, newSessionCookie)
}

export const createSession = async (idToken: string) => {
  const { maxAge } = Cookies.Session
  const sessionCookie = await app
    .auth()
    .createSessionCookie(idToken, { expiresIn: maxAge * 1000 })
  return sessionCookie
}

export const withSession = (response: NextResponse, sessionCookie: string) => {
  const { name, maxAge } = Cookies.Session
  const httpOnly = true
  response.cookies.set(name, sessionCookie, { maxAge, httpOnly })
  return response
}

export const destroySession = async (response: NextResponse) => {
  const { name } = Cookies.Session
  response.cookies.delete(name)
  return response
}
