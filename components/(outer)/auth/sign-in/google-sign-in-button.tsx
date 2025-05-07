"use client"

import { Button } from "@/components/shadcn/button"
import { GoogleIcon } from "@/components/icons/google-icon"
import { useTranslations } from "next-intl"
import {
  getAuth,
  inMemoryPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth"
import { useLocale } from "next-intl"
import { onSigningIn } from "@/lib/modules/access-managing/presentation/controllers/on-signing-in"
import { Cookies } from "@/lib/constants/cookies"
import CookiesManager from "js-cookie"
import { useRouter } from "next/navigation"
import { Routes } from "@/lib/constants/routes"
import { app } from "@/lib/infrastructure/providers/firebase"
import { useState } from "react"

const auth = getAuth(app)

const handleGoogleLogin = async ({
  locale,
  router,
  csrfToken,
  setIsSigningIn,
}: {
  locale: string
  router: ReturnType<typeof useRouter>
  csrfToken: string
  setIsSigningIn: (value: boolean) => void
}) => {
  auth.languageCode = locale
  auth.setPersistence(inMemoryPersistence)
  const provider = new GoogleAuthProvider()
  const credentials = await signInWithPopup(auth, provider)
  const idToken = await credentials.user.getIdToken()

  try {
    setIsSigningIn(true)
    await onSigningIn({
      idToken,
      csrfToken,
    })
    await signOut(auth)
    router.refresh()
  } catch (error) {
    console.error(error)
    setIsSigningIn(false)
  }
}

export default function GoogleSignInButton() {
  const t = useTranslations(Routes.SignIn)
  const locale = useLocale()
  const router = useRouter()
  const csrfToken = CookiesManager.get(Cookies.CSRFToken.name)!
  const [isSigningIn, setIsSigningIn] = useState(false)
  return (
    <Button
      onClick={() =>
        handleGoogleLogin({ locale, router, csrfToken, setIsSigningIn })
      }
      disabled={isSigningIn}
      className="flex w-full items-center justify-center gap-2 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
      variant="outline"
    >
      <GoogleIcon className="h-5 w-5" />
      <span>{t("buttons.sign-in-with-google")}</span>
    </Button>
  )
}
