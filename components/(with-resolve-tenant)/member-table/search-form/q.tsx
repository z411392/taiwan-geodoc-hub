"use client"

import { Search } from "lucide-react"
import { Input } from "~/components/shadcn/input"
import { useTranslations } from "next-intl"
import { useFormRef } from "~/composables/providers/trace-id-provider"

export default function ({ q }: { q: string }) {
    const t = useTranslations(
        "(with-resolve-tenant)/member-table/search-form/q",
    )
    const formRef = useFormRef()
    const handleKeyDown = (key: string) => {
        if (key !== "Enter") return
        formRef.current?.submit()
    }
    return (
        <div className="flex-1">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    name="q"
                    defaultValue={q}
                    placeholder={t("placeholder")}
                    className="pl-8"
                    onKeyDown={({ key }) => handleKeyDown(key)}
                />
            </div>
        </div>
    )
}
