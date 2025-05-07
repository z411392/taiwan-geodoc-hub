"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/shadcn/button"
import { ChevronLeft } from "lucide-react"
import { type PublicRoute, Routes } from "@/lib/constants/routes"
import { useTranslations } from "next-intl"
import Logo from "@/components/logo"

function PublicPageNavigator({ route }: { route: PublicRoute }) {
  const _ = useTranslations(Routes.Root)
  const router = useRouter()
  const [hasHistory, setHasHistory] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("hasNavigated") !== "true") return
    setHasHistory(true)
  }, [])

  const handleBack = () => router.back()
  if (route.startsWith(Routes.SignIn))
    return (
      <div className="flex items-center gap-4">
        <Link
          href={Routes.TermsOfUse}
          className="text-sm text-teal-700 hover:underline"
        >
          {_("header.terms-of-use")}
        </Link>
        <Link
          href={Routes.PrivacyPolicy}
          className="text-sm text-teal-700 hover:underline"
        >
          {_("header.privacy-policy")}
        </Link>
      </div>
    )

  if (route.startsWith(Routes.TenantSelection)) return null

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

export default function Header({ route }: { route: PublicRoute }) {
  useEffect(() => sessionStorage.setItem("hasNavigated", "true"), [])
  const _ = useTranslations(Routes.Root)
  return (
    <header className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <Link href={Routes.TenantSelection}>
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
