"use client"

import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar"
import { Button } from "@/components/shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import Link from "next/link"
import { type Profile } from "@/lib/modules/access-managing/application/queries/retrieve-profile"
import HamburgerMenu from "@/components/tenants/[tenantId]/header/hamburger"
import { useTranslations } from "next-intl"
import Logo from "@/components/logo"
import { Routes } from "@/lib/constants/routes"
import { LanguageSelector } from "@/components/tenants/[tenantId]/header/language-selector"
import Notifications from "@/components/tenants/[tenantId]/header/notifications"
import { Cookies } from "@/lib/constants/cookies"
import CookiesManager from "js-cookie"
import { onSigningOut } from "@/lib/modules/access-managing/presentation/controllers/on-signing-out"
import { useRouter } from "next/navigation"
import { useState } from "react"

const handleSignOut = async ({
  csrfToken,
  router,
  setIsSigningOut,
}: {
  csrfToken: string
  router: ReturnType<typeof useRouter>
  setIsSigningOut: (value: boolean) => void
}) => {
  setIsSigningOut(true)
  try {
    await onSigningOut({ csrfToken })
    router.refresh()
  } catch (error) {
    console.error(error)
    setIsSigningOut(false)
  }
}

export default function Header({
  profile,
  locale,
}: {
  profile: Profile
  locale: string
}) {
  const _ = useTranslations(Routes.Root)
  const __ = useTranslations(Routes.Tenant)
  const router = useRouter()
  const csrfToken = CookiesManager.get(Cookies.CSRFToken.name)!
  const [isSigningOut, setIsSigningOut] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center justify-between py-4 px-6">
        <div className="flex items-center gap-4">
          <HamburgerMenu profile={profile} />
          <Link
            href={Routes.TenantSelection}
            className="flex items-center gap-2"
          >
            <Logo className="h-6 w-6 text-teal-600" />
            <span className="font-bold hidden md:inline-block">
              {_("header.app-name")}
            </span>
          </Link>
          <div className="hidden md:flex">
            <span className="text-sm text-muted-foreground">
              {profile.tenant.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector locale={locale} />
          <Notifications tenantId={profile.tenant.id} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt={profile.name} />
                  <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {profile.name}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  handleSignOut({ csrfToken, router, setIsSigningOut })
                }
                disabled={isSigningOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{__("buttons.sign-out")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
