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
import { Locale as LocaleCookie } from "@/taiwan-geodoc-hub/modules/general/constants/cookies"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { UpdateUserPreferencesPort } from "@/taiwan-geodoc-hub/modules/access-controlling/domain/ports/update-user-preferences-port"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { useContainer } from "~/composables/providers/trace-id-provider/user-provider"
import { type Locale } from "@/taiwan-geodoc-hub/modules/general/enums/locale"

const displayNameOf = (locale: string) => {
    const { name } = Languages.find((language) => language.code === locale)!
    return name
}

const useLocaleChangeHandler = () => {
    const defaultLocale = useLocale() as `${Locale}`
    const [locale, setLocale] = useState<`${Locale}`>(defaultLocale)
    const router = useRouter()
    const container = useContainer()
    const updateUserPreferences = async (locale: `${Locale}`) => {
        try {
            const updateUserPreferencesPort = container.resolve(
                UpdateUserPreferencesPort as NonAbstractClass<UpdateUserPreferencesPort>,
            )
            await updateUserPreferencesPort.update({ locale })
        } catch {}
    }
    const expires = Math.floor(LocaleCookie.maxAge / 86400)
    const onLocaleChange = async (locale: `${Locale}`) => {
        await updateUserPreferences(locale)
        setLocale(locale)
        CookiesManager.set(LocaleCookie.name, locale, { expires })
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
