"use client"

import { CreditCard, LogOut, User, Bell } from "lucide-react"
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

export default function Header({ profile }: { profile: Profile }) {
  const t = useTranslations("(outer)")
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
              {t("header.app-name")}
            </span>
          </Link>
          <div className="hidden md:flex">
            <span className="text-sm text-muted-foreground">
              {profile.tenant.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">通知</span>
          </Button>
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
                  <p className="text-xs leading-none text-muted-foreground">
                    點數餘額: {profile.tenant.points}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>個人資料</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>點數紀錄</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>登出</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
