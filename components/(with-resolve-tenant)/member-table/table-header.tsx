"use client"

import { TableHeader, TableRow, TableHead } from "~/components/shadcn/table"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations("(with-resolve-tenant)/member-table/table-header")
    return (
        <TableHeader>
            <TableRow>
                <TableHead>{t("id")}</TableHead>
                <TableHead>{t("role")}</TableHead>
                <TableHead>{t("last-signed-in-at")}</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
        </TableHeader>
    )
}
