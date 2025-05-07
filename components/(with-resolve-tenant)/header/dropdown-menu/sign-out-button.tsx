"use client"

import { DropdownMenuItem } from "~/components/shadcn/dropdown-menu"
import { useTranslations } from "next-intl"
import { LogOut } from "lucide-react"
import { useTransition } from "react"
import { getAuth } from "firebase/auth"
import { useRouter } from "next/navigation"
import { AuthAPI } from "@/taiwan-geodoc-hub/modules/general/enums/auth-api"

const useSignOutHandler = () => {
    const [isInProgress, startTransition] = useTransition()
    const router = useRouter()
    const auth = getAuth()
    const handleSignOut = async () => {
        if (!auth) return
        return startTransition(async () => {
            const idToken = await auth.currentUser?.getIdToken()
            try {
                if (idToken)
                    await fetch(AuthAPI.SignOut, {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    })
                await auth.signOut()
                router.refresh()
            } catch (error) {
                console.error(error)
            }
        })
    }
    return {
        isInProgress,
        handleSignOut,
    }
}

export default function () {
    const t = useTranslations(
        "(with-resolve-tenant)/header/dropdown-menu/sign-out-button",
    )
    const { isInProgress, handleSignOut } = useSignOutHandler()
    return (
        <DropdownMenuItem
            onClick={() => handleSignOut()}
            disabled={isInProgress}
        >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("title")}</span>
        </DropdownMenuItem>
    )
}
