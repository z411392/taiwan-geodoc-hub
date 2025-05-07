"use client"

import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/shadcn/avatar"
import { Button } from "~/components/shadcn/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/shadcn/dropdown-menu"
import Link from "next/link"
import Hamburger from "~/components/tenants/[tenantId]/header/hamburger"
import { useTranslations } from "next-intl"
import Logo from "~/components/logo"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import LanguageSelector from "~/components/language-selector"
import Notifications from "~/components/tenants/[tenantId]/header/notifications"
import { useRouter } from "next/navigation"
import { useState, useCallback, useTransition } from "react"
import { APIRoutes } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { useTenant } from "~/composables/contexts/with-resolve-tenant"
import { useUser } from "~/composables/contexts/with-resolve-user"
import { Auth as AuthToken } from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import { useContainer } from "~/composables/contexts/with-resolve-trace-id"
import { type Auth } from "firebase/auth"

export default function Header() {
    const [timestamp, setTimestamp] = useState<number>(Date.now())
    const _ = useTranslations(Route.Root)
    const t = useTranslations(Route.Tenant)
    const container = useContainer()
    const router = useRouter()
    const auth: Auth = container.resolve(AuthToken)
    const user = useUser()!
    const tenant = useTenant()
    const [isInProgress, startTransition] = useTransition()
    const signOut = useCallback(() => {
        if (!auth) return
        return startTransition(async () => {
            const idToken = await auth.currentUser?.getIdToken()
            try {
                if (idToken)
                    await fetch(APIRoutes.SignOut, {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    })
                await auth.signOut()
                router.refresh()
            } catch {
                setTimestamp(Date.now())
            }
        })
    }, [auth, router])
    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-16 items-center justify-between py-4 px-6">
                <div className="flex items-center gap-4">
                    <Hamburger />
                    <Link
                        href={Route.TenantSelection}
                        className="flex items-center gap-2"
                    >
                        <Logo className="h-6 w-6 text-teal-600" />
                        <span className="font-bold hidden md:inline-block">
                            {_("components.(public).header.app-name")}
                        </span>
                    </Link>
                    <div className="hidden md:flex">
                        <span className="text-sm text-muted-foreground">
                            {tenant.name}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <LanguageSelector />
                    <Notifications />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src="/placeholder-user.jpg"
                                        alt={user.displayName}
                                    />
                                    <AvatarFallback>
                                        {user.displayName.slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56"
                            align="end"
                            forceMount
                        >
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {user.displayName}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                key={timestamp}
                                onClick={() => signOut()}
                                disabled={isInProgress}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>{t("buttons.sign-out")}</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
