"use client"

import Link from "next/link"
import Logo from "~/components/(without-resolve-user)/logo"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { useTranslations } from "next-intl"

export default function () {
    const _ = useTranslations("_")
    return (
        <Link href={Route.TenantSelection}>
            <div className="flex items-center gap-2">
                <Logo className="h-6 w-6 text-teal-600" />
                <span className="text-lg font-medium text-teal-700">
                    {_("constants.app.name")}
                </span>
            </div>
        </Link>
    )
}
