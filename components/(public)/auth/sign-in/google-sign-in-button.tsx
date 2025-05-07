"use client"

import { Button } from "~/components/shadcn/button"
import GoogleIcon from "~/components/icons/google-icon"
import { useTranslations } from "next-intl"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/routes"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useAuth } from "~/composables/providers/firebase-provider"
import { APIRoutes } from "@/taiwan-geodoc-hub/infrastructure/routes"
import { useState, useCallback, useTransition } from "react"

export default function GoogleSignInButton() {
    const [timestamp, setTimestamp] = useState<number>(Date.now())
    const t = useTranslations(Pages.SignIn)
    const router = useRouter()
    const [isInProgress, startTransition] = useTransition()
    const auth = useAuth()
    const signInWithGoogle = useCallback(() => {
        if (!auth) return
        return startTransition(async () => {
            try {
                const { user } = await signInWithPopup(
                    auth,
                    new GoogleAuthProvider(),
                )
                const idToken = await user.getIdToken()
                await fetch(APIRoutes.SignIn, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                })
                router.refresh()
            } catch {
                setTimestamp(Date.now())
            }
        })
    }, [auth, router])

    return (
        <Button
            key={timestamp}
            onClick={() => signInWithGoogle()}
            disabled={isInProgress}
            className="flex w-full items-center justify-center gap-2 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
            variant="outline"
        >
            <GoogleIcon className="h-5 w-5" />
            <span>{t("buttons.sign-in-with-google")}</span>
        </Button>
    )
}
