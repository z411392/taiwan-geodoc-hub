import { useTranslations } from "next-intl"

export default function () {
    const _ = useTranslations("_")
    return (
        <footer className="container mx-auto p-4 text-center text-sm text-gray-500">
            {_("constants.copyright", {
                year: "2025",
            })}
        </footer>
    )
}
