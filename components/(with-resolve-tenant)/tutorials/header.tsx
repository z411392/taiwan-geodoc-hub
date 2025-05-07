import {
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/shadcn/card"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations("(with-resolve-tenant)/tutorials/header")
    return (
        <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
    )
}
