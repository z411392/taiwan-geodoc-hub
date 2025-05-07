import { type NextRequest } from "next/server"
import { getTranslations } from "next-intl/server"
import { Routes } from "@/lib/constants/routes"
import { getCSRFToken as csrfTokenFromHeader } from "@/lib/infrastructure/helpers/http/headers/csrf"
import { getCSRFToken as csrfTokenFromCookie } from "@/lib/infrastructure/helpers/http/cookies/csrf"

export const checkCSRFToken = async (request: NextRequest) => {
  const t = await getTranslations(Routes.Root)
  const fromHeader = csrfTokenFromHeader(request)
  const fromCookie = csrfTokenFromCookie(request)
  if (!fromCookie || !fromHeader)
    throw new Error(t("errors.csrf-token-now-found"))
  if (fromCookie !== fromHeader)
    throw new Error(t("errors.csrf-token-mismatch"))
}
