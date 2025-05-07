"use client"

import { useTranslations } from "next-intl"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"

export default function Footer() {
    const _ = useTranslations(Route.Root)
    return (
        <footer className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
            <p>{_("components.(public).footer.copyright", { year: "2025" })}</p>
        </footer>
    )
}
