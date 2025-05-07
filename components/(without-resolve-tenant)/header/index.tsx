"use client"

import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { type PublicRoute } from "@/taiwan-geodoc-hub/modules/general/dtos/public-route"
import { usePathname } from "next/navigation"
import LanguageSelector from "~/components/(without-resolve-user)/language-selector"
import Logo from "~/components/(without-resolve-tenant)/header/logo"
import BackButton from "~/components/(without-resolve-tenant)/header/back-button"

export default function () {
    const route = usePathname() as PublicRoute
    const showBackButton = !(
        route.startsWith(Route.SignIn) ||
        route.startsWith(Route.TenantSelection)
    )
    return (
        <header className="container mx-auto p-4">
            <div className="flex items-center justify-between">
                <Logo />
                {!showBackButton && (
                    <div className="flex items-center gap-4">
                        <LanguageSelector />
                    </div>
                )}
                {showBackButton && <BackButton />}
            </div>
        </header>
    )
}
