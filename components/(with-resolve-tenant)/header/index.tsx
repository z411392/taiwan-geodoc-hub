"use client"

import Hamburger from "~/components/(with-resolve-tenant)/header/hamburger"
import Logo from "~/components/(with-resolve-tenant)/header/logo"
import LanguageSelector from "~/components/(without-resolve-user)/language-selector"
import Inbox from "~/components/(with-resolve-tenant)/header/inbox"
import { useTenant } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider"
import DropdownMenu from "~/components/(with-resolve-tenant)/header/dropdown-menu"

export default function () {
    const tenant = useTenant()
    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-16 items-center justify-between py-4 px-6">
                <div className="flex items-center gap-4">
                    <Hamburger />
                    <Logo />
                    <div className="hidden md:flex">
                        <span className="text-sm text-muted-foreground">
                            {tenant.name}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <LanguageSelector />
                    <Inbox />
                    <DropdownMenu />
                </div>
            </div>
        </header>
    )
}
