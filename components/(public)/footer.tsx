import { useTranslations } from "next-intl"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/routes"

export default function Footer() {
    const _ = useTranslations(Pages.Root)
    return (
        <footer className="container mx-auto p-4 text-center text-sm text-gray-500">
            {_("footer.copyright", { year: "2025" })}
        </footer>
    )
}
