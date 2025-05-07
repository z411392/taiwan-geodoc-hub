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

const displayNameOf = (locale: string) => {
    const { name } = Languages.find((language) => language.code === locale)!
    return name
}

const useLocaleChangeHandler = () => {
    const defaultLocale = useLocale()
    const [locale, setLocale] = useState(defaultLocale)
    const router = useRouter()
    const expires = Math.floor(Locale.maxAge / 86400)
    const onLocaleChange = (locale: string) => {
        setLocale(locale)
        CookiesManager.set(Locale.name, locale, { expires })
        router.refresh()
    }
    return {
        locale,
        onLocaleChange,
    }
}

export default function () {
    const t = useTranslations("(without-resolve-user)/language-selector")
    const { locale, onLocaleChange } = useLocaleChangeHandler()
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
                        {displayNameOf(locale)}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("title")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => onLocaleChange(language.code)}
                        className="flex items-center justify-between"
                    >
                        <span>
                            <span className="mr-2">{language.flag}</span>
                            {language.name}
                        </span>
                        {locale === language.code && (
                            <Check className="h-4 w-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
