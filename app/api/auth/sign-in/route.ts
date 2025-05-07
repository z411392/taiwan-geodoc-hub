import { type NextRequest, NextResponse } from "next/server"
import {
  createSession,
  withSession,
} from "@/lib/infrastructure/helpers/http/cookies/session"
import { checkCSRFToken } from "@/lib/infrastructure/helpers/http/validations/csrf"

export async function POST(request: NextRequest) {
  try {
    await checkCSRFToken(request)
    const { idToken } = (await request.json()) as { idToken: string }
    const sessionCookie = await createSession(idToken)
    return withSession(NextResponse.json({}), sessionCookie)
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      { status: 401 },
    )
  }
}
