"use client"

import { useState } from "react"
import { Check, Globe } from "lucide-react"
import { Button } from "@/components/shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import { Languages } from "@/lib/constants/languages"
import { useTranslations } from "next-intl"
import { Cookies } from "@/lib/constants/cookies"
import CookiesManager from "js-cookie"
import { Routes } from "@/lib/constants/routes"

export function LanguageSelector({ locale }: { locale: string }) {
  const [currentLanguage, setLocale] = useState(locale)
  const __ = useTranslations(Routes.Tenant)
  const expires = Math.floor(Cookies.Locale.maxAge / 86400)
  const handleLanguageChange = (locale: string) => {
    setLocale(locale)
    CookiesManager.set(Cookies.Locale.name, locale, {
      expires,
    })
    window.location.reload()
  }

  const getLocaleName = () => {
    const language = Languages.find(
      (language) => language.code === currentLanguage,
    )!
    return language.name
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline-block">{getLocaleName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {__("sections.select-language.title")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between"
          >
            <span>
              <span className="mr-2">{language.flag}</span>
              {language.name}
            </span>
            {currentLanguage === language.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
