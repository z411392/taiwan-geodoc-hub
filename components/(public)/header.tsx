"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "~/components/shadcn/button"
import { ChevronLeft } from "lucide-react"
import {
    type PublicPage,
    Pages,
} from "@/taiwan-geodoc-hub/infrastructure/routes"
import { useTranslations } from "next-intl"
import Logo from "~/components/logo"
import { usePathname } from "next/navigation"

function PublicPageNavigator({ route }: { route: PublicPage }) {
    const _ = useTranslations(Pages.Root)
    const router = useRouter()
    const [hasHistory, setHasHistory] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem("hasNavigated") !== "true") return
        setHasHistory(true)
    }, [])

    const handleBack = () => router.back()
    if (route.startsWith(Pages.SignIn))
        return (
            <div className="flex items-center gap-4">
                <Link
                    href={Pages.TermsOfUse}
                    className="text-sm text-teal-700 hover:underline"
                >
                    {_("header.terms-of-use")}
                </Link>
                <Link
                    href={Pages.PrivacyPolicy}
                    className="text-sm text-teal-700 hover:underline"
                >
                    {_("header.privacy-policy")}
                </Link>
            </div>
        )

    if (route.startsWith(Pages.TenantSelection)) return null

    return (
        <Button
            variant="ghost"
            className={`flex items-center gap-1 text-teal-700 ${!hasHistory ? "hidden" : ""}`}
            onClick={handleBack}
        >
            <ChevronLeft className="h-4 w-4" />
            <span>{_("header.back")}</span>
        </Button>
    )
}

export default function Header() {
    const route = usePathname() as PublicPage
    useEffect(() => sessionStorage.setItem("hasNavigated", "true"), [])
    const _ = useTranslations(Pages.Root)
    return (
        <header className="container mx-auto p-4">
            <div className="flex items-center justify-between">
                <Link href={Pages.TenantSelection}>
                    <div className="flex items-center gap-2">
                        <Logo className="h-6 w-6 text-teal-600" />
                        <span className="text-lg font-medium text-teal-700">
                            {_("header.app-name")}
                        </span>
                    </div>
                </Link>
                <PublicPageNavigator route={route} />
            </div>
        </header>
    )
}
