"use client"

import Link from "next/link"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import Logo from "~/components/(without-resolve-user)/logo"
import { useTranslations } from "next-intl"

export default function () {
    const _ = useTranslations("_")
    return (
        <Link href={Route.TenantSelection} className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-teal-600" />
            <span className="font-bold hidden md:inline-block">
                {_("constants.app.name")}
            </span>
        </Link>
    )
}
