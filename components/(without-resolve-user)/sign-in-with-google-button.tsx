"use client"

import { Button } from "~/components/shadcn/button"
import GoogleIcon from "~/components/icons/google-icon"
import { useTranslations } from "next-intl"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useRouter } from "next/navigation"
import { AuthAPI } from "@/taiwan-geodoc-hub/modules/general/enums/auth-api"
import { useState, useCallback, useTransition } from "react"
import { getAuth } from "firebase/auth"

export default function () {
    const [timestamp, setTimestamp] = useState<number>(Date.now())
    const t = useTranslations(
        "(without-resolve-user)/sign-in-with-google-button",
    )
    const router = useRouter()
    const [isInProgress, startTransition] = useTransition()
    const auth = getAuth()
    const signInWithGoogle = useCallback(() => {
        if (!auth) return
        return startTransition(async () => {
            try {
                const { user } = await signInWithPopup(
                    auth,
                    new GoogleAuthProvider(),
                )
                const idToken = await user.getIdToken()
                await fetch(AuthAPI.SignIn, {
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
            <span>{t("title")}</span>
        </Button>
    )
}
