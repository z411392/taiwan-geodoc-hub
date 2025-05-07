"use client"

import { useState } from "react"
import { Check, Globe } from "lucide-react"
import { Button } from "~/components/shadcn/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/shadcn/dropdown-menu"
import { Languages } from "@/taiwan-geodoc-hub/modules/general/constants/languages"
import { useTranslations } from "next-intl"
import CookiesManager from "js-cookie"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { Locale } from "@/taiwan-geodoc-hub/modules/general/constants/cookies"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"

export default function LanguageSelector() {
    const locale = useLocale()
    const [currentLanguage, setLocale] = useState(locale)
    const __ = useTranslations(Route.Tenant)
    const router = useRouter()
    const expires = Math.floor(Locale.maxAge / 86400)
    const handleLanguageChange = (locale: string) => {
        setLocale(locale)
        CookiesManager.set(Locale.name, locale, {
            expires,
        })
        router.refresh()
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
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                >
                    <Globe className="h-4 w-4" />
                    <span className="hidden md:inline-block">
                        {getLocaleName()}
                    </span>
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
                        {currentLanguage === language.code && (
                            <Check className="h-4 w-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
