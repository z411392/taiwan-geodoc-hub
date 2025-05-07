import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations("(with-resolve-user)/pending-tenants/header")
    return <h2 className="text-xl font-medium text-gray-700">{t("title")}</h2>
}
