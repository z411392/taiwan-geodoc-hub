"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "~/components/shadcn/button"
import { ChevronLeft } from "lucide-react"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { type PublicRoute } from "@/taiwan-geodoc-hub/modules/general/dtos/public-route"
import { useTranslations } from "next-intl"
import Logo from "~/components/logo"
import { usePathname } from "next/navigation"
import LanguageSelector from "~/components/language-selector"

function PublicPageNavigator({ route }: { route: PublicRoute }) {
    const _ = useTranslations(Route.Root)
    const router = useRouter()
    const [hasHistory, setHasHistory] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem("hasNavigated") !== "true") return
        setHasHistory(true)
    }, [])

    const handleBack = () => router.back()
    if (
        route.startsWith(Route.SignIn) ||
        route.startsWith(Route.TenantSelection)
    )
        return (
            <div className="flex items-center gap-4">
                <LanguageSelector />
            </div>
        )

    return (
        <Button
            variant="ghost"
            className={`flex items-center gap-1 text-teal-700 ${!hasHistory ? "hidden" : ""}`}
            onClick={handleBack}
        >
            <ChevronLeft className="h-4 w-4" />
            <span>{_("components.(public).header.back")}</span>
        </Button>
    )
}

export default function Header() {
    const route = usePathname() as PublicRoute
    useEffect(() => sessionStorage.setItem("hasNavigated", "true"), [])
    const _ = useTranslations(Route.Root)
    return (
        <header className="container mx-auto p-4">
            <div className="flex items-center justify-between">
                <Link href={Route.TenantSelection}>
                    <div className="flex items-center gap-2">
                        <Logo className="h-6 w-6 text-teal-600" />
                        <span className="text-lg font-medium text-teal-700">
                            {_("components.(public).header.app-name")}
                        </span>
                    </div>
                </Link>
                <PublicPageNavigator route={route} />
            </div>
        </header>
    )
}
