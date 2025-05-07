import { useTranslations } from "next-intl"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"

export default function Footer() {
    const _ = useTranslations(Route.Root)
    return (
        <footer className="container mx-auto p-4 text-center text-sm text-gray-500">
            {_("components.(public).footer.copyright", { year: "2025" })}
        </footer>
    )
}
