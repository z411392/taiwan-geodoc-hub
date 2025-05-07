"use client"

import { useTranslations } from "next-intl"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/constants/routes"

export default function Footer() {
    const _ = useTranslations(Pages.Root)
    return (
        <footer className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
            <p>{_("footer.copyright", { year: "2025" })}</p>
        </footer>
    )
}
